import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './paths'
import Home from '../pages/Home'
import JotaiTest from '../pages/JotaiTest'
import NotFound from '../pages/NotFound'
import DerivedTest from '../pages/DerivedTest'
import AsyncTest from '../pages/AsyncTeSt'
import Chat from '../pages/Chat'
const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.JOTAI_TEST} element={<JotaiTest />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path={ROUTES.DERIVED_TEST} element={<DerivedTest />} />
      <Route path={ROUTES.ASYNC_TEST} element={<AsyncTest />} />
      <Route path={ROUTES.CHAT} element={<Chat />} />
    </Routes>
  )
}

export default Router