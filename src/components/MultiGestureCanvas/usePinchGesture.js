/* eslint-disable no-param-reassign */
import {useEffect, useState} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {runOnJS, useAnimatedReaction, useSharedValue, withSpring} from 'react-native-reanimated';
import * as MultiGestureCanvasUtils from './utils';

const usePinchGesture = ({
    canvasSize,
    zoomScale,
    zoomRange,
    offsetX,
    offsetY,
    pinchTranslateX: totalPinchTranslateX,
    pinchTranslateY: totalPinchTranslateY,
    pinchScale,
    stopAnimation,
    onScaleChanged,
    isPagerSwiping,
}) => {
    // The current pinch gesture event scale
    const currentPinchScale = useSharedValue(1);

    // Origin of the pinch gesture
    const pinchOrigin = {
        x: useSharedValue(0),
        y: useSharedValue(0),
    };

    // How much the content is translated during the pinch gesture
    // While the pinch gesture is running, the pan gesture is disabled
    // Therefore we need to add the translation separately
    const pinchTranslateX = useSharedValue(0);
    const pinchTranslateY = useSharedValue(0);

    // In order to keep track of the "bounce" effect when "overzooming"/"underzooming",
    // we need to have extra "bounce" translation variables
    const pinchBounceTranslateX = useSharedValue(0);
    const pinchBounceTranslateY = useSharedValue(0);

    // Update the total (pinch) translation based on the regular pinch + bounce
    useAnimatedReaction(
        () => [pinchTranslateX.value, pinchTranslateY.value, pinchBounceTranslateX.value, pinchBounceTranslateY.value],
        ([translateX, translateY, bounceX, bounceY]) => {
            totalPinchTranslateX.value = translateX + bounceX;
            totalPinchTranslateY.value = translateY + bounceY;
        },
    );

    /**
     * Calculates the adjusted focal point of the pinch gesture,
     * based on the canvas size and the current offset
     */
    const getAdjustedFocal = MultiGestureCanvasUtils.useWorkletCallback(
        (focalX, focalY) => ({
            x: focalX - (canvasSize.width / 2 + offsetX.value),
            y: focalY - (canvasSize.height / 2 + offsetY.value),
        }),
        [canvasSize.width, canvasSize.height],
    );

    // The pinch gesture is disabled when we release one of the fingers
    // On the next render, we need to re-enable the pinch gesture
    const [pinchEnabled, setPinchEnabled] = useState(true);
    useEffect(() => {
        if (pinchEnabled) {
            return;
        }
        setPinchEnabled(true);
    }, [pinchEnabled]);

    const pinchGesture = Gesture.Pinch()
        .enabled(pinchEnabled)
        .onTouchesDown((_evt, state) => {
            // We don't want to activate pinch gesture when transformations are disabled
            if (!isPagerSwiping.value) {
                return;
            }

            state.fail();
        })
        .onStart((evt) => {
            stopAnimation();

            // Set the origin focal point of the pinch gesture at the start of the gesture
            const adjustedFocal = getAdjustedFocal(evt.focalX, evt.focalY);
            pinchOrigin.x.value = adjustedFocal.x;
            pinchOrigin.y.value = adjustedFocal.y;
        })
        .onChange((evt) => {
            // Disable the pinch gesture if one finger is released,
            // to prevent the content from shaking/jumping
            if (evt.numberOfPointers !== 2) {
                runOnJS(setPinchEnabled)(false);
                return;
            }

            const newZoomScale = pinchScale.value * evt.scale;

            // Limit the zoom scale to zoom range including bounce range
            if (
                zoomScale.value >= zoomRange.min * MultiGestureCanvasUtils.zoomScaleBounceFactors.min &&
                zoomScale.value <= zoomRange.max * MultiGestureCanvasUtils.zoomScaleBounceFactors.max
            ) {
                zoomScale.value = newZoomScale;
                currentPinchScale.value = evt.scale;

                if (onScaleChanged != null) {
                    runOnJS(onScaleChanged)(zoomScale.value);
                }
            }

            // Calculate new pinch translation
            const adjustedFocal = getAdjustedFocal(evt.focalX, evt.focalY);
            const newPinchTranslateX = adjustedFocal.x + currentPinchScale.value * pinchOrigin.x.value * -1;
            const newPinchTranslateY = adjustedFocal.y + currentPinchScale.value * pinchOrigin.y.value * -1;

            // If the zoom scale is within the zoom range, we perform the regular pinch translation
            // Otherwise it means that we are "overzoomed" or "underzoomed", so we need to bounce back
            if (zoomScale.value >= zoomRange.min && zoomScale.value <= zoomRange.max) {
                pinchTranslateX.value = newPinchTranslateX;
                pinchTranslateY.value = newPinchTranslateY;
            } else {
                // Store x and y translation that is produced while bouncing
                // so we can revert the bounce once pinch gesture is released
                pinchBounceTranslateX.value = newPinchTranslateX - pinchTranslateX.value;
                pinchBounceTranslateY.value = newPinchTranslateY - pinchTranslateY.value;
            }
        })
        .onEnd(() => {
            // Add pinch translation to total offset and reset gesture variables
            offsetX.value += pinchTranslateX.value;
            offsetY.value += pinchTranslateY.value;
            pinchTranslateX.value = 0;
            pinchTranslateY.value = 0;
            currentPinchScale.value = 1;

            // If the content was "overzoomed" or "underzoomed", we need to bounce back with an animation
            if (pinchBounceTranslateX.value !== 0 || pinchBounceTranslateY.value !== 0) {
                pinchBounceTranslateX.value = withSpring(0, MultiGestureCanvasUtils.SPRING_CONFIG);
                pinchBounceTranslateY.value = withSpring(0, MultiGestureCanvasUtils.SPRING_CONFIG);
            }

            const triggerScaleChangeCallback = () => {
                'worklet';

                if (onScaleChanged == null) {
                    return;
                }

                runOnJS(onScaleChanged)(zoomScale.value);
            };

            if (zoomScale.value < zoomRange.min) {
                // If the zoom scale is less than the minimum zoom scale, we need to set the zoom scale to the minimum
                pinchScale.value = zoomRange.min;
                zoomScale.value = withSpring(zoomRange.min, MultiGestureCanvasUtils.SPRING_CONFIG, triggerScaleChangeCallback);
            } else if (zoomScale.value > zoomRange.max) {
                // If the zoom scale is higher than the maximum zoom scale, we need to set the zoom scale to the maximum
                pinchScale.value = zoomRange.max;
                zoomScale.value = withSpring(zoomRange.max, MultiGestureCanvasUtils.SPRING_CONFIG, triggerScaleChangeCallback);
            } else {
                // Otherwise, we just update the pinch scale offset
                pinchScale.value = zoomScale.value;
                triggerScaleChangeCallback();
            }
        });

    return pinchGesture;
};

export default usePinchGesture;
