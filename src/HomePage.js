import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './css/HomePage.css';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
    const imagesToLoad = [
        '/pictures/fisk3.png', '/pictures/fisk4.png',
        '/pictures/flaske1.png', '/pictures/flaske2.png', '/pictures/flaske3.png', '/pictures/glass.png',
        '/pictures/fisk8.png',
        '/pictures/flaske4.png', '/pictures/flaske5.png', '/pictures/flaske6.png', '/pictures/flaske7.png'
    ];

    // Shuffling function to randomize image order
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const leftSideContainerRef = useRef(null);
    const rightSideContainerRef = useRef(null);

    useEffect(() => {
        // Prepare the images for looping
        const singleImageHeight = leftSideContainerRef.current.firstElementChild.clientHeight + 10; // 10 is the margin bottom value

        // Calculate the total number of images needed to fill the screen
        const imagesNeeded = Math.ceil(window.innerHeight / singleImageHeight) * 2; // multiply by 2 for a buffer

        // Clone and shuffle the images for looping effect
        const cloneAndShuffleImages = (containerRef) => {
            for (let i = 0; i < imagesNeeded; i++) {
                shuffleArray(imagesToLoad).forEach(imagePath => {
                    const img = document.createElement("img");
                    img.src = imagePath;
                    img.className = "random-image";
                    containerRef.current.appendChild(img);
                });
            }
        };

        // Clone and shuffle images for both left and right containers
        cloneAndShuffleImages(leftSideContainerRef);
        cloneAndShuffleImages(rightSideContainerRef);

        // Calculate the total height of the images in the container
        const totalHeight = imagesNeeded * singleImageHeight * imagesToLoad.length / 2; // divide by 2 because we doubled the number of images needed

        // GSAP timeline for looping scroll effect
        gsap.to([leftSideContainerRef.current, rightSideContainerRef.current], {
            y: -totalHeight,
            ease: "linear",
            repeat: -1, // Loop indefinitely
            duration: 60, // Adjust duration to control the speed of the scroll
            modifiers: {
                y: gsap.utils.unitize(y => parseFloat(y) % totalHeight), // Loop back to start position
            },
        });

        return () => {
            gsap.killTweensOf(leftSideContainerRef.current);
            gsap.killTweensOf(rightSideContainerRef.current);
        };
    }, []);



    return (
        <div className="background-container">
          <div className="side-container left" ref={leftSideContainerRef}>
            {imagesToLoad.map((imagePath, index) => (
              <img
                key={`left-image-${index}`}
                src={imagePath}
                alt=""
                className="random-image"
              />
            ))}
          </div>
    

      <div className="home-container">
        <img src="/pictures/logo.png" alt="Logo" className="logo" />
        <h1 className="home-title">Den fordrukne pirat er tilbake for å slukke tørst</h1>
        <div className="buttons-container">
          <button className="button">Start et spill</button>
          <button className="button">Logg inn</button>
          <button className="button">Innstillinger</button>
        </div>
      </div>


    <div className="side-container right" ref={rightSideContainerRef}>
        {imagesToLoad.map((imagePath, index) => (
          <img
            key={`right-image-${index}`}
            src={imagePath}
            alt=""
            className="random-image"
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;