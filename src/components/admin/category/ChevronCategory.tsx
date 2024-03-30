import React, { useEffect, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';

type Props = {
    containerRef: any
    selectedItem: any
}

const ChevronCategory = ({
    containerRef,
    selectedItem
}: Props) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    useEffect(() => {
        const container = containerRef?.current;
        const maxScrollPosition = container.clientWidth < container.scrollWidth
        const handleContainerScroll = () => {
            setShowLeftArrow(container.scrollLeft > 0);
            if (Math.floor(container.scrollWidth - container.scrollLeft - container.clientWidth) <= 0) {
                setShowRightArrow(false);
            } else {
                if (maxScrollPosition) {
                    setShowRightArrow(true);
                }
            }
        };

        if (container) {
            container.addEventListener('scroll', handleContainerScroll);

            // Cleanup function
            return () => {
                container.removeEventListener('scroll', handleContainerScroll);
            };
        }

    }, [containerRef?.current, JSON.stringify(selectedItem)]);


    const handleScroll = (direction: string) => {
        const container: any = containerRef.current;
        const itemWidth = 200; // Adjust this based on your item width

        if (container) {
            let newPosition;
            if (direction === 'left') {
                newPosition = scrollPosition - itemWidth;
            } else {
                newPosition = scrollPosition + itemWidth;
            }
            container.scrollTo({
                left: newPosition,
                behavior: 'smooth',
            });
            setScrollPosition(newPosition);
        }
        setTimeout(() => {
            setButtonDisabled(false);
        }, 500);
    };



    return (
        <>
            {showLeftArrow && (
                <Button
                    sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
                    onClick={() => handleScroll('left')}
                    disabled={isButtonDisabled}
                >
                    <ChevronLeftIcon />
                </Button>
            )}

            {/* Right arrow */}
            {showRightArrow
                &&
                (
                    <Button
                        sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
                        onClick={() => handleScroll('right')}
                        disabled={isButtonDisabled}
                    >
                        <ChevronRightIcon />
                    </Button>
                )}
        </>
    )
}

export default ChevronCategory