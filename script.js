        let flag = 0;
        const rotationStep = 11; // Degrees to rotate per slide change
        let currentRotation = 0; // Current rotation angle
        
        const slides = document.getElementsByClassName("slide");
        const prevArrow = document.getElementById("prevArrow");
        const nextArrow = document.getElementById("nextArrow");
        
        function controller(x) {
            // Prevent moving past the last slide or before the first slide
            if (flag === slides.length - 1 && x === 1) return; // Next slide (right arrow)
            if (flag === 0 && x === -1) return; // Previous slide (left arrow)
        
            flag += x;
            slideshow(flag);
        
            // Rotate section based on direction
            if (x === 1) {
                currentRotation -= rotationStep; // Move left on next arrow or scroll down
            } else if (x === -1) {
                currentRotation += rotationStep; // Move right on prev arrow or scroll up
            }
        
            rotateSection(currentRotation);
        
            // Update arrow states
            updateArrowStates();
        }
        
        function slideshow(num) {
            if (num >= slides.length) {
                flag = slides.length - 1;
                num = slides.length - 1;
            } else if (num < 0) {
                flag = 0;
                num = 0;
            }
        
            for (let y of slides) {
                y.style.display = "none";
            }
        
            slides[num].style.display = "block";
        }
        
        function rotateSection(angle) {
            document.getElementById('rotateSection').style.transform = `translateX(-50%) rotate(${angle}deg)`;
        }
        
        function updateArrowStates() {
            // Disable the next arrow when on the last slide
            nextArrow.classList.toggle('disabled', flag === slides.length - 1);
            // Disable scrolling up when on the first slide
            prevArrow.classList.toggle('disabled', flag === 0);
        }
    
        // Remove or comment out the handleScroll function and related event listener
        // document.getElementById('slider').addEventListener('wheel', throttledHandleScroll);
        document.getElementById('prevArrow').addEventListener('click', () => controller(-1)); // Previous slide
        document.getElementById('nextArrow').addEventListener('click', () => controller(1)); // Next slide
        
        // Initialize the slideshow and arrow states
        slideshow(flag);
        updateArrowStates();
