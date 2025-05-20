import { expect } from '@playwright/test'
const createBlog = async (page,title,author,url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('titleBox').fill(title)
  await page.getByTestId('authorBox').fill(author)
  await page.getByTestId('urlBox').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`A new blog ${title} by ${author} added`).waitFor()
  // ).toBeVisible();

  // await expect(page.getByText(`${title} ${author}`)).toBeVisible();
}

const login = async (page, username,password) => {
    const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill(username)
        await textboxes[1].fill(password)
        await page.getByRole('button', { name: 'login' }).click()
}

module.exports = {
    createBlog,
    login
}