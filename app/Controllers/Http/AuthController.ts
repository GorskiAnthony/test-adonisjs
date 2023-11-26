import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class AuthController {
  /**
   * showLoginForm
   */
  public showLoginForm(ctx: HttpContextContract) {
    return ctx.view.render('auth/login')
  }

  /**
   * login
   */
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()
    await auth.attempt(email, password)
    return response.redirect().back()
  }

  /**
   * register
   */
  public async register({ request, response }) {
    const payload = await request.validate(CreateUserValidator)
    await User.create(payload)
    return response.redirect().back()
  }

  /**
   * logout
   */
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect().back()
  }
}
