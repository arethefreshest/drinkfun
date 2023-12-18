import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import './css/HomePage.css';
import Modal from './Modal';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartGameClick = () => navigate('/game');
  const handleLoginClick = () => navigate('/login');
  const handleSettingsClick = () => navigate('/settings');

  const imagesToLoad = useMemo(
    () => [
      '/pictures/fisk3.png',
      '/pictures/fisk4.png',
      '/pictures/flaske1.png',
      '/pictures/flaske2.png',
      '/pictures/flaske3.png',
      '/pictures/glass.png',
      '/pictures/fisk8.png',
      '/pictures/flaske4.png',
      '/pictures/flaske5.png',
      '/pictures/flaske6.png',
      '/pictures/flaske7.png',
    ],
    [],
  );

  const leftSideContainerRef = useRef(null);
  const rightSideContainerRef = useRef(null);

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    // cloneAndShuffleImages should be defined inside useEffect or wrapped in a useCallback if used elsewhere
    const cloneAndShuffleImages = (
      containerRef,
      images,
      singleImageHeight,
      numberOfImages,
    ) => {
      for (let i = 0; i < numberOfImages; i++) {
        shuffleArray(images).forEach((imagePath) => {
          const img = document.createElement('img');
          img.src = imagePath;
          img.className = 'random-image';
          containerRef.current.appendChild(img);
        });
      }
    };

    // Calculate singleImageHeight based on loaded images in left side container
    const imageElements = document.querySelectorAll('.side-container.left img');
    const singleImageHeight = imageElements[0]
      ? imageElements[0].clientHeight + 10
      : 0;
    const imagesNeeded = Math.ceil(window.innerHeight / singleImageHeight) * 2;

    cloneAndShuffleImages(
      leftSideContainerRef,
      imagesToLoad,
      singleImageHeight,
      imagesNeeded,
    );
    cloneAndShuffleImages(
      rightSideContainerRef,
      imagesToLoad,
      singleImageHeight,
      imagesNeeded,
    );

    const leftSideElement = leftSideContainerRef.current;
    const rightSideElement = rightSideContainerRef.current;

    gsap.to([leftSideContainerRef.current, rightSideContainerRef.current], {
      y: -imagesNeeded * singleImageHeight,
      ease: 'linear',
      repeat: -1, // Loop indefinitely
      duration: 360, // Adjust duration to control the speed of the scroll
      modifiers: {
        y: gsap.utils.unitize(
          (y) => (parseFloat(y) % imagesNeeded) * singleImageHeight,
        ), // Loop back to start position
      },
    });

    return () => {
      gsap.killTweensOf(leftSideElement);
      gsap.killTweensOf(rightSideElement);
    };
  }, [imagesToLoad]); // only re-run when images change

  return (
    <div className="background-container">
      <div className="side-container left" ref={leftSideContainerRef}>
        {imagesToLoad.map((imagePath) => (
          <img
            key={imagePath}
            src={imagePath}
            alt=""
            className="random-image"
          />
        ))}
      </div>

      <div className="home-container">
        <img src="/pictures/logo.png" alt="Logo" className="logo" />
        <h1 className="home-title">
          Den fordrukne pirat er tilbake for å slukke tørst
        </h1>
        <div className="buttons-container">
          <button className="button" onClick={handleStartGameClick}>
            Start et spill
          </button>
          <button className="button" onClick={handleLoginClick}>
            Logg inn
          </button>
          <button className="button" onClick={handleSettingsClick}>
            Innstillinger
          </button>
        </div>
      </div>

      <div className="side-container right" ref={rightSideContainerRef}>
        {imagesToLoad.map((imagePath) => (
          <img
            key={imagePath}
            src={imagePath}
            alt=""
            className="random-image"
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
