window.addEventListener("load", () => {
   const ci = {
      x: 300,
      y: 300,
      radius: 20,
      startAngel: 0,
      endAngle: Math.PI * 2,
      counterClockWise: false
   };
   localStorage.setItem("penData", JSON.stringify(ci));
});

/** this listener for get current mouse position in paint boom for using this in @Pen
 * */
boomPaint.addEventListener("mousemove", (event) => {
   const rect = boomPaint.getBoundingClientRect();
   const mouseX = event.clientX - rect.left;
   const mouseY = event.clientY - rect.top;
   localStorage.setItem("getClient", ToStringFiy({x: mouseX, y: mouseY}));
});