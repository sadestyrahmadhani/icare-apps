import { Component, useRef } from "react";

export default class extends Component {
    constructor(props) {
        super(props)
        this.state =  {
            cameraActive: false
        }
        const videoRef = useRef(null)
    }

    startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true})
            videoRef.current.srcObject = stream
            this.setState({cameraActive: true})
        } catch (error) {
            console.error("Error accessing the camera:", error)
        }
    }

    stopCamera = () => {
        const stream = videoRef.current.srcObject
        const tracks = stream.getTracks()

        tracks.forEach((track) => {
            track.stop()
        })
        videoRef.current.srcObject = null
        this.setState({cameraActive: false})
    }

    render() {
        return(
            <>
                <div className="col-3">
                    <button onClick={cameraActive ? this.stopCamer : this.startCamera}></button>
                </div>
            </>
        )
    }
}