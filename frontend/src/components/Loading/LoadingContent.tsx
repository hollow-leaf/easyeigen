import AdjustIcon from '@mui/icons-material/Adjust'
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react'

interface Props {
  message: {
    processing: string
    failed: string
    success: string
  }
  promise: Promise<any>
}

export function LoadingContent (props: Props) {
  const [status,setStatus] = useState('processing')

  function switchContent () {
    switch(status) {
      case 'success':
        return (<div><CheckCircleIcon /> {props.message.success}</div>)
      case 'processing': 
        return (<div><AdjustIcon /> {props.message.processing}</div>)
      case 'failed':
        return (<div><ErrorIcon /> {props.message.failed}</div>)
    }
  }
  useEffect(() => {
    props.promise
      .then(() => {
        setStatus('success')
      })
      .catch(() => {
        setStatus('fail')
      })
  })
  return (
    <>
      {switchContent()}
    </>
  )
}