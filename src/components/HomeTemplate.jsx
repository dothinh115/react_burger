import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router'

export const HomeTemplate = (props) => {

  return (
    <div className="container">
      <h1>
        Bài tập bánh burger
      </h1>
      <div className="row">
        <Outlet />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(HomeTemplate)