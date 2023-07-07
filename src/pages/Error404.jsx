function Error404() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div>
          <div className="d-flex justify-content-center align-items-center text-light border border-danger">
            <span className="my-2 fs-4 mx-2 py-1 text-danger">
              Error 404 - Not found
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;
