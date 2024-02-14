'use client'

import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import FullscreenControl from './FullScreenControl'
import VolumeControl from './VolumeControl'

interface ILiveVideo {
	participant: Participant
}

const LiveVideo = ({ participant }: ILiveVideo) => {
	const videoRef = useRef<ElementRef<'video'>>(null)
	const wrapperRef = useRef<ElementRef<'div'>>(null)

	const [isFullScreen, setIsFullScreen] = useState(false)
	const [volume, setVolume] = useState(0)

	const toggleFullscreen = () => {
		if (isFullScreen) {
			document.exitFullscreen()
		} else if (wrapperRef.current) {
			wrapperRef.current.requestFullscreen()
		}
	}

	const onVolumeChange = (value: number) => {
		setVolume(+value)

		if (videoRef.current) {
			videoRef.current.muted = value === 0
			videoRef.current.volume = +value * 0.01
		}
	}

	const toggleMute = () => {
		const isMuted = volume === 0

		setVolume(isMuted ? 50 : 0)

		if (videoRef.current) {
			videoRef.current.muted = !isMuted
			videoRef.current.volume = isMuted ? 0.5 : 0
		}
	}

	const handleFullscreenChange = () => {
		const isCurrentlyFullscreen = document.fullscreenElement !== null
		setIsFullScreen(isCurrentlyFullscreen)
	}

	useEffect(() => {
		onVolumeChange(0)
	}, [])

	useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef)

	useTracks([Track.Source.Camera, Track.Source.Microphone])
		.filter(track => track.participant.identity === participant.identity)
		.forEach(track => {
			if (videoRef.current) {
				track.publication.track?.attach(videoRef.current)
			}
		})

	return (
		<div
			onDoubleClick={toggleFullscreen}
			ref={wrapperRef}
			className='relative w-full'
		>
			<video ref={videoRef} width={'100%'} />
			<div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
				<div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4'>
					<VolumeControl
						onToggle={toggleMute}
						onChange={onVolumeChange}
						value={volume}
					/>
					<FullscreenControl
						isFullscreen={isFullScreen}
						onToggle={toggleFullscreen}
					/>
				</div>
			</div>
		</div>
	)
}

export default LiveVideo
