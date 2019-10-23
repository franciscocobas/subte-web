import React from 'react'

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch, useLocation } from 'react-router-dom'

import Home from './Home'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

import ProjectDetail from './sections/projects/ProjectDetail'

import '../styles/Body.scss'

export default function Body() {

  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={1000}
      >
        <Switch location={location}>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/projects' component={Projects} />
          <Route exact path='/contact' component={Contact} />

          <Route path='/projects/:id' children={<ProjectDetail />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}