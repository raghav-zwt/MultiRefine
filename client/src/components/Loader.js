import LoaderSpin from "../assets/images/loader.gif";

function Loader() {
  return (
    <>
      <div className='Loader-style'>
        <img src={LoaderSpin} width={80} height={80} alt="loading..." />
      </div>
    </>
  )
}

export default Loader
