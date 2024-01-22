import LoaderSpin from "../assets/images/loader.gif";

function Loader() {
  return (
    <>
      <div className='Loader-style'>
        <img src={LoaderSpin} width={50} height={50} alt="loading..." />
      </div>
    </>
  )
}

export default Loader
