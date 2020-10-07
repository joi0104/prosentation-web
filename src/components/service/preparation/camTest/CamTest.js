import React, { useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'

import style from './CamTest.scss'

const cx = classNames.bind(style)

const CamTest = ({ setCamTestOK }) => {
  const [testOK, setTestOK] = useState(false)
  const video = useRef()
  const constraints = (window.constraints = {
    audio: false,
    video: true,
  })

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => handleSuccess(stream))
      .catch((err) => handleError(err))
  })

  const handleSuccess = (stream) => {
    video.current.srcObject = stream
    video.current.onloadedmetadata = (e) => {
      video.current.play()
      setTestOK(true)
    }
  }

  const handleError = (err) => {
    if (err.name === 'ConstraintNotSatisfiedError') {
      alert(
        `${constraints.video.width.exact}x${constraints.video.height.exact}크기의 카메라를 지원하지 않아요 ㅠㅠ`
      )
    } else if (err.name === 'PermissionDeniedError') {
      alert('카메라 요청을 허가해주세요!')
    } else {
      alert(`에러 발생!${err.name}`)
    }
  }

  const goNext = () => {
    if (testOK) {
      setCamTestOK(true)
    } else {
      alert('카메라 테스트를 완료해주세요!')
    }
  }

  return (
    <div className={cx('CamTest')}>
      <p className={cx('description')}>
        가이드 선 안에 얼굴을 위치 시키고 체크시작 버튼을 누르면 타이머가
        나옵니다.
      </p>
      <p className={cx('description')}>
        5초의 타이머가 나오는 동시에 아래 문장으로 소리 내어 읽어주세요.
      </p>
      <video ref={video} autoPlay playsInline></video>
      <p className={cx('state')}>{testOK ? '연결완료!' : '연결필요!'}</p>
      <button className={cx('button')} onClick={goNext}>
        다음
      </button>
    </div>
  )
}

export default CamTest
