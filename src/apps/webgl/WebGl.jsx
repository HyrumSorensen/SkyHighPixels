import React from 'react'

function WebGl() {
  return (
    <div>
<iframe
    src={`${process.env.PUBLIC_URL}/BouncingCircles/index.html`}
    width="800"
    height="600"
    title="Bouncing Circles"
    frameBorder="0"
></iframe>
    </div>

  )
}

export default WebGl