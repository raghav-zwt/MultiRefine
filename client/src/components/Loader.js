import { useEffect } from "react";

function Loader() {

  useEffect(() => {
    const rootElement = document.getElementById("root");
    const splashScreenElement = document.getElementById("splash-screen");

    if (rootElement && splashScreenElement) {
      rootElement.classList.add('gray-body');
      splashScreenElement.style.display = 'flex';

      return () => {
        rootElement.classList.remove('gray-body');
        splashScreenElement.style.display = 'none';
      };
    }
  }, []);

  return (
    <></>
  )
}

export default Loader
