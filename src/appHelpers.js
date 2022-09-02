import * as Applications from './Applications'

export const appTypes = Object.values(Applications).reduce((prev, curr) => {
    const { name } = curr.config

    return {
        ...prev,
        [name]: name
    }
}, {})

export const getAppContent = (type) => {
    const { Component } = Applications[type]

    console.log(Component)

    return Component ? <Component /> : <div />
}