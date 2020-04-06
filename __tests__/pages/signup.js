import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Signup from '../../pages/signup'
import * as signupHelper from '../../helpers/signupUser'
import Router from 'next/router'

describe('Signup Page', () => {
  test('Should render without crashing', () => {
    const { getByTestId } = render(<Signup />)
    getByTestId('email')
    getByTestId('username')
    getByTestId('password')
    getByTestId('firstName')
    getByTestId('lastName')
  })

  //to be readded once validation of form takes place in real time
  // test('Should not submit values', async () => {
  //   const { getByTestId } = render(<Signup {...props} />)
  //   const submitButton = getByTestId('submit')
  //   fireEvent.click(submitButton)
  //   await wait(() => expect(submitSignup).not.toBeCalled())
  // })

  test('Should submit signup form values and redirect upon successful submission', async () => {
    signupHelper.signupUser = jest
      .fn()
      .mockReturnValue(Promise.resolve({ success: 'true' }))
    Router.push = jest.fn()
    const { getByTestId } = render(<Signup />)
    const emailField = getByTestId('email')
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')
    const firstNameField = getByTestId('firstName')
    const lastNameField = getByTestId('lastName')
    const submitButton = getByTestId('submit')

    await wait(
      () =>
        fireEvent.change(emailField, {
          target: {
            value: 'email@domain.com'
          }
        }),
      fireEvent.change(usernameField, {
        target: {
          value: 'user name'
        }
      }),
      fireEvent.change(passwordField, {
        target: {
          value: 'password123'
        }
      }),
      fireEvent.change(firstNameField, {
        target: {
          value: 'user'
        }
      }),
      fireEvent.change(lastNameField, {
        target: {
          value: 'name'
        }
      })
    )

    await wait(() => {
      fireEvent.click(submitButton),
        expect(signupHelper.signupUser).toHaveBeenCalledTimes(1),
        expect(Router.push).toHaveBeenCalledWith('/signup/success')
    })
  })
})
