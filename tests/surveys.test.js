const Page = require('./helpers/page')

let page
beforeEach(async () => {
  page = await Page.build()
  await page.goto('http://localhost:3000')
})

afterEach(async () => {
  await page.close()
})

describe('when logged in', () => {
  beforeEach(async () => {
    await page.login()
    await page.click('a.btn-floating')
  })

  test('when logged in, can see survey create form', async () => {
    const titleLabel = await page.getContentsOf('.title label')
    const senderLabel = await page.getContentsOf('.sender label')
    const subjectLabel = await page.getContentsOf('.subject label')
    const questionLabel = await page.getContentsOf('.question label')
    const recipientsLabel = await page.getContentsOf('.recipients label')
    
    expect(titleLabel).toEqual('Survey Title')
    expect(senderLabel).toEqual('Sender Address')
    expect(subjectLabel).toEqual('Subject Line')
    expect(questionLabel).toEqual('Product Question')
    expect(recipientsLabel).toEqual('Recipient List')
  })

  describe('and using valid inputs', () => {
    beforeEach(async () => {
      await page.type('.title input', 'My Title')
      await page.type('.sender input', 'My Sender')
      await page.type('.subject input', 'My Subject')
      await page.type('.question input', 'My Question')
      await page.type('.recipients input', 'email@email.com')
      await page.click('form button')
    })

    test('submitting takes user to review screen', async () => {
      const text = await page.getContentsOf('h5')
      expect(text).toEqual('Please confirm your entries')
    })

    test('submitting then saving adds survey to index page', async () => {
      await page.click('button.green')
      await page.waitFor('.card')

      const title = await page.getContentsOf('.card-title')
      const sender = await page.getContentsOf('.card-sender')
      const subject = await page.getContentsOf('.card-subject')
      const question = await page.getContentsOf('.card-question')

      expect(title).toEqual('My Title')
      expect(sender).toEqual('My Sender')
      expect(subject).toEqual('My Subject')
      expect(question).toEqual('My Question')
    })
  })

  describe('and using invalid inputs', () => {
    beforeEach(async () => {
      await page.click('form button')
    })

    test('the form shows an error message', async () => {
      const titleError = await page.getContentsOf('.title .red-text')
      const senderError = await page.getContentsOf('.sender .red-text')
      const subjectError = await page.getContentsOf('.subject .red-text')
      const questionError = await page.getContentsOf('.question .red-text')
      const recipientsError = await page.getContentsOf('.recipients .red-text')

      expect(titleError).toEqual('You must provide a value')
      expect(senderError).toEqual('You must provide a value')
      expect(subjectError).toEqual('You must provide a value')
      expect(questionError).toEqual('You must provide a value')
      expect(recipientsError).toEqual('You must provide a value')
    })
  })
})

describe('when user is not logged in', () => {
  test('user cannot create survey', async () => {
    const result = await page.evaluate(() => {
      return fetch('/api/surveys', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'My Title',
          sender: 'My Sender',
          subject: 'My Subject',
          question: 'My Question',
          recipients: ['email@email.com']
        })
      }).then(res => res.json())
    })

    expect(result).toEqual({ error: 'You must log in!' })
  })

  test('user cannot get a list of surveys', async () => {
    const result = await page.evaluate(() => {
      return fetch('/api/surveys', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
    })

    expect(result).toEqual({ error: 'You must log in!' })
  })
})
