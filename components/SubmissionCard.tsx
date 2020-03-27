import React from 'react'
import Button from './Button'

type Props = {
  userId: string
  initial: string
  time: string
  challengeTitle: string
  reviewUrl: string
}

const SubmissionCard: React.FC<Props> = props => {
  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <div className="d-flex mt-1">
          <h6 className="text-uppercase bg-primary rounded-circle text-light p-3 mr-3">
            {props.initial}
          </h6>
          <div>
            <h5 className="m-0">{props.userId}</h5>
            <div className="text-muted">
              <small>Submitted on {props.time}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text text-primary">{props.challengeTitle}</p>
        <a className="d-inline-block" href={props.reviewUrl}>
          <Button text="Review" btnType="btn-primary" />
        </a>
      </div>
    </div>
  )
}

export default SubmissionCard
