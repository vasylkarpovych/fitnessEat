function slider() {
  // // Slider 1

  // const slides = document.querySelectorAll(".offer__slide"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next"),
  //   total = document.querySelector("#total"),
  //   current = document.querySelector("#current");
  // let slideIndex = 1;

  // showSlides(slideIndex);

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = `${slides.length}`;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => (item.style.display = "none"));

  //   slides[slideIndex - 1].style.display = "block";

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = `${slideIndex}`;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });

  // Slider 2
  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = `${slides.length}`;
    current.textContent = `${slideIndex}`;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];

  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    // return +str.replace(/\D/g, "");
    const number = parseFloat(str.replace("px", ""));
    return Math.round(number);
  }

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      // 500px - ми вирізаємо два останні символи і переводим у число
      offset = 0;
      // current.textContent = slides.length;
    } else {
      offset += deleteNotDigits(width);
      // current.textContent = +width.slice(0, width.length - 2) / slides.length;
    }

    //!!!!!!!!!!!!!!!!!!!!!! тут в мене була проблема, що замість 650px мені писало 649.992px і тим самим мені потім переводило в число 649992, а мені треба, щоб було 650, тому я застосував функцію округлення Math.round(), тільки я його застосував до width що вище
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = `${slideIndex}`;
    }

    dots.forEach((dot) => {
      dot.style.opacity = ".5";
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = `${slideIndex}`;
    }

    dots.forEach((dot) => {
      dot.style.opacity = ".5";
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = `${slideIndex}`;
      }

      dots.forEach((dot) => {
        dot.style.opacity = ".5";
        dots[slideIndex - 1].style.opacity = 1;
      });
    });
  });
}

module.exports = slider;

//   // Slider 3 // как в примере

//   let offset = 0;
//   let slideIndex = 1;

//   const slides = document.querySelectorAll(".offer__slide"),
//     slider = document.querySelector(".offer__slider"),
//     prev = document.querySelector(".offer__slider-prev"),
//     next = document.querySelector(".offer__slider-next"),
//     total = document.querySelector("#total"),
//     current = document.querySelector("#current"),
//     slidesWrapper = document.querySelector(".offer__slider-wrapper"),
//     width = window.getComputedStyle(slidesWrapper).width,
//     slidesField = document.querySelector(".offer__slider-inner");

//   if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;
//     current.textContent = `0${slideIndex}`;
//   } else {
//     total.textContent = slides.length;
//     current.textContent = slideIndex;
//   }

//   slidesField.style.width = 100 * slides.length + "%";
//   slidesField.style.display = "flex";
//   slidesField.style.transition = "0.5s all";

//   slidesWrapper.style.overflow = "hidden";

//   slides.forEach((slide) => {
//     slide.style.width = width;
//   });

//   slider.style.position = "relative";

//   const indicators = document.createElement("ol"),
//     dots = [];
//   indicators.classList.add("carousel-indicators");
//   indicators.style.cssText = `
//      position: absolute;
//      right: 0;
//      bottom: 0;
//      left: 0;
//      z-index: 15;
//      display: flex;
//      justify-content: center;
//      margin-right: 15%;
//      margin-left: 15%;
//      list-style: none;
//  `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
//   slider.append(indicators);

//   for (let i = 0; i < slides.length; i++) {
//     const dot = document.createElement("li");
//     dot.setAttribute("data-slide-to", i + 1);
//     dot.style.cssText = `
//          box-sizing: content-box;
//          flex: 0 1 auto;
//          width: 30px;
//          height: 6px;
//          margin-right: 3px;
//          margin-left: 3px;
//          cursor: pointer;
//          background-color: #fff;
//          background-clip: padding-box;
//          border-top: 10px solid transparent;
//          border-bottom: 10px solid transparent;
//          opacity: .5;
//          transition: opacity .6s ease;
//      `;
//     if (i == 0) {
//       dot.style.opacity = 1;
//     }
//     indicators.append(dot);
//     dots.push(dot);
//   }

//   next.addEventListener("click", () => {
//     if (offset == deleteNotDigits(width) * (slides.length - 1)) {
//       offset = 0;
//     } else {
//       offset += deleteNotDigits(width);
//     }

//     slidesField.style.transform = `translateX(-${offset}px)`;

//     if (slideIndex == slides.length) {
//       slideIndex = 1;
//     } else {
//       slideIndex++;
//     }

//     if (slides.length < 10) {
//       current.textContent = `0${slideIndex}`;
//     } else {
//       current.textContent = slideIndex;
//     }

//     dots.forEach((dot) => (dot.style.opacity = ".5"));
//     dots[slideIndex - 1].style.opacity = 1;
//   });

//   prev.addEventListener("click", () => {
//     if (offset == 0) {
//       offset = deleteNotDigits(width) * (slides.length - 1);
//     } else {
//       offset -= deleteNotDigits(width);
//     }

//     slidesField.style.transform = `translateX(-${offset}px)`;

//     if (slideIndex == 1) {
//       slideIndex = slides.length;
//     } else {
//       slideIndex--;
//     }

//     if (slides.length < 10) {
//       current.textContent = `0${slideIndex}`;
//     } else {
//       current.textContent = slideIndex;
//     }

//     dots.forEach((dot) => (dot.style.opacity = ".5"));
//     dots[slideIndex - 1].style.opacity = 1;
//   });

//   dots.forEach((dot) => {
//     dot.addEventListener("click", (e) => {
//       const slideTo = e.target.getAttribute("data-slide-to");

//       slideIndex = slideTo;
//       offset = deleteNotDigits(width) * (slideTo - 1);

//       slidesField.style.transform = `translateX(-${offset}px)`;

//       if (slides.length < 10) {
//         current.textContent = `0${slideIndex}`;
//       } else {
//         current.textContent = slideIndex;
//       }

//       dots.forEach((dot) => (dot.style.opacity = ".5"));
//       dots[slideIndex - 1].style.opacity = 1;
//     });
//   });

//   function deleteNotDigits(str) {
//     return +str.replace(/\D/g, "");
//   }
// }

// module.exports = slider;