import React from "react";
import ReactPlayer from "./ReactPlayer";
const DropZone = ({
  setshowDropzone,
  blobUrl,
  fileType,
  progress,
  getRootProps,
  getInputProps,
  handleInput,
  title,
  category,
  description,
  channels,
  channelInput,
  setshowDropdown,
  handleDropdown,
  showDropdown,
  ChannelList,
  selectChannel,
  removeChannel,
  EditForm,
  updateForm,
  handleDropzoneSubmit,
  handlePlayerReady,
  Cropper,
  crop,
  setCrop,
  onCropComplete,
  acceptedFiles,
  zoom,
  setZoom,
  CategoryList,
}) => {
  return (
    <div className="container d-flex mt-2 file-folder-cnt">
      {/* Progress Bar */}
      <div className="container">
        <button
          onClick={() => setshowDropzone(false)}
          className="btn btn-danger mx-2"
        >
          <i className="bi bi-arrow-left-circle"></i>
          Back
        </button>
        <div className={`progress my-2 ${blobUrl ? "w-100" : "w-50"}`}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress}%
          </div>
        </div>
        <div
          {...getRootProps({
            className: `dropzone mb-2 ${blobUrl ? "w-100" : "w-50"}`,
          })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className={`input-group mb-3 ${blobUrl ? "w-100" : "w-50"}`}>
          <input
            type="text"
            onChange={handleInput}
            name="title"
            value={title}
            className="form-control"
            placeholder="Title"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className={`input-group ${blobUrl ? "w-100" : "w-50"}`}>
          <textarea
            className="form-control"
            onChange={handleInput}
            name="description"
            value={description}
            placeholder="Description..."
            aria-label="With textarea"
          ></textarea>
        </div>
        {/* choose channel dropdown with filter */}
        <div className={`input-group mt-3 ${blobUrl ? "w-100" : "w-50"}`}>
          <input
            type="text"
            onChange={handleInput}
            value={channelInput}
            name="channelInput"
            className="form-control"
            placeholder="Assign Channel"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onFocus={() => setshowDropdown(true)}
            onBlur={handleDropdown}
            autoComplete="off"
          />
          {/* box */}
        </div>
        {showDropdown && (
          <ul className="list-group position-absolute w-50 z-index">
            {ChannelList.filter((channel) => {
              return channel.channelName
                .toLowerCase()
                .includes(channelInput.toLowerCase());
            }).map((channel, i) => (
              <div
                key={i}
                onClick={() => selectChannel(channel._id)}
                className="list-group-item w-75"
              >
                {channel.channelName}
              </div>
            ))}
          </ul>
        )}
        {/* show selected channels */}
        <div className="position-static mt-1 px-0 w-50 d-flex flex-wrap">
          {channels.map((e, i) => (
            <div
              key={i}
              className="toast show "
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <strong className="me-auto">{e.channelName}</strong>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => removeChannel(e._id)}
                ></button>
              </div>
            </div>
          ))}
        </div>
        <div className={`input-group mt-3 ${blobUrl ? "w-100" : "w-50"}`}>
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            category
          </label>
          <select
            onChange={handleInput}
            value={category}
            name="category"
            className="form-select"
            id="inputGroupSelect01"
          >
            <option defaultValue>Choose...</option>
            {CategoryList.map((e, i) => (
              <option key={i} value={e._id}>
                {e.englishName}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={EditForm ? updateForm : handleDropzoneSubmit}
          className="btn btn-dark mt-2"
        >
          Submit File
        </button>
      </div>
      {blobUrl && (
        <aside className="container">
          <h4>Preview :-</h4>
          {fileType === "video" && (
            <div className="react-player">
              <ReactPlayer
                options={{
                  autoplay: false,
                  controls: true,
                  responsive: true,
                  fluid: true,
                  sources: [
                    {
                      src: blobUrl,
                      type: "video/mp4",
                    },
                  ],
                }}
                onReady={handlePlayerReady}
              />
            </div>
          )}
          {fileType === "audio" && (
            <audio src={blobUrl} controls className="w-75" />
          )}
          {fileType === "image" && (
            <div className="App">
              <div className="crop-container">
                <Cropper
                  image={blobUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              {/* <div className="controls">
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                                setZoom(e.target.value)
                            }}
                            className="zoom-range"
                        />
                    </div> */}
            </div>
          )}
          {acceptedFiles.map((file, i) => (
            <div key={i}>
              <strong>Name :</strong> {file.path} <br />
              <strong>Size :</strong>{" "}
              {Math.round(file.size / 1000) > 1000
                ? Math.round(file.size / 1000000) +
                  "." +
                  Math.round(file.size % 1000) +
                  " MB"
                : Math.round(file.size / 1000) + " KB"}
            </div>
          ))}
        </aside>
      )}
    </div>
  );
};

export default DropZone;
