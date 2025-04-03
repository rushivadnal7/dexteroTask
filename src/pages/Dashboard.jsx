import React from 'react'
import styled from 'styled-components'
import Default from '../layout/Default'

const Dashboard = () => {
    return (
        <Default>
            <DashBoardWrapper>
                dashboard
            </DashBoardWrapper>
        </Default>
    )
}

export default Dashboard

const DashBoardWrapper = styled.section`
    margin-left: 250px;
        width: 80%;
        height: 100%;
`