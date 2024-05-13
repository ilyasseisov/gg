// useState
import { useState } from 'react';
// useEffect
import { useEffect } from 'react';
// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

// confetti
import Confetti from 'react-confetti';

gsap.registerPlugin(useGSAP);

export default function Roulette({
  data,
  totalNumberOfDegrees,
  setTotalNumberOfDegrees,
  selectedIndex,
  setSelectedIndex,
  winningNumber,
  gameCount,
  isWin,
  setIsWin,
}) {
  // local variables

  // hooks
  const [spinValues, setSpinValues] = useState([
    { index: 0, value: data[0].number },
  ]);

  // gsap
  const wheelRef = useRef();
  const wheelContainerRef = useRef();
  const { contextSafe } = useGSAP({
    scope: wheelContainerRef,
  });

  // sound
  const audioRef = useRef(null);
  //

  // set wheel to 0 degrees when game is new
  useGSAP(() => {
    if (gameCount > 1) {
      // reset wheel degree and remove "active" class from slice
      const allSlices = wheelRef.current.querySelectorAll('.slice');
      allSlices.forEach((slice) => slice.classList.remove('active'));
      gsap.set(wheelRef.current, { rotation: 0 });
    }
  }, [gameCount]);
  //
  useEffect(() => {
    console.log(data);
    console.log(`win = ${winningNumber}`);
  }, []);

  // to identify the winning spin
  useEffect(() => {
    if (spinValues.length > 1) {
      if (spinValues[spinValues.length - 1].value === winningNumber) {
        console.log('🏆');
        setIsWin(true);
      }
    }
  }, [spinValues]);

  //

  // functions
  const wheelRotate = contextSafe(() => {
    //
    let numberOfSectors = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
    let numberOfDegrees = numberOfSectors * -18;

    setTotalNumberOfDegrees((prev) => prev + numberOfDegrees);
    setSelectedIndex((prev) => (prev + numberOfSectors) % 20);

    const newSpinValue = {
      index: selectedIndex,
      value: data?.[selectedIndex]?.number,
    };
    setSpinValues([...spinValues, newSpinValue]);

    //
    // number transform function
    function degreeToNumber(degree) {
      return Math.abs(parseInt(degree)) % 360;
    }
    //

    gsap.to(wheelRef.current, {
      rotation: `${totalNumberOfDegrees}`,
      duration: 6.5,
      ease: 'power4.out',
      //   onUpdate() {
      //     console.log(
      //       degreeToNumber(gsap.getProperty(this.targets()[0], 'rotation'))
      //     );
      //   },
      onUpdate() {
        const currentDegree = degreeToNumber(
          gsap.getProperty(this.targets()[0], 'rotation')
        );

        // Find the active object based on degree and object properties
        const activeObject = data.find((obj) => {
          const minDegree = obj.minDegree || 0; // Handle potential missing minDegree
          const maxDegree = obj.maxDegree || 360; // Handle potential missing maxDegree
          return currentDegree >= minDegree && currentDegree <= maxDegree;
        });

        // Highlight the active object using className
        if (activeObject) {
          const allSlices = wheelRef.current.querySelectorAll('.slice'); // Get all slices

          allSlices.forEach((slice) => {
            slice.classList.remove('active'); // Remove 'active' from all initially
          });

          // Find the active slice element based on object properties (assuming unique numbers)
          const activeSliceIndex = data.findIndex(
            (obj) => obj === activeObject
          );
          if (activeSliceIndex !== -1) {
            const activeSlice = allSlices[activeSliceIndex]; // Get slice at matching index

            if (activeSlice) {
              activeSlice.classList.add('active');
            }
          }
        } else {
          // Handle cases where no active object is found (optional)
        }
      },
    });

    // audio
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    //
  });
  //
  //

  // return
  return (
    <>
      {isWin && (
        <Confetti
          colors={['#F4DE6A', '#9E4EC0', '#F4D04C', '#8139A0', '#EAB535']}
        />
      )}

      <div
        className={`wheel-container ${isWin && 'opacity-05'}`}
        ref={wheelContainerRef}
      >
        <div className='wheel' ref={wheelRef}>
          <div className='slices'>
            {data.map((item) => (
              <div key={item.number} className='slice'>
                <span>{item.number}</span>
              </div>
            ))}
          </div>
        </div>
        <button disabled={isWin} onClick={wheelRotate} className='spin-btn'>
          spin
        </button>
        <div className='arrow'>
          <img src='/pointer.svg' alt='pointer' />
        </div>
      </div>

      <audio ref={audioRef}>
        <source src='/roulette_sound.MP3' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
