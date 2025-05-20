const { test, expect, beforeEach, describe } = require('@playwright/test')

const { login, createBlog } = require('./testhelper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3000/api/testing/reset')
    await request.post('http://localhost:3000/api/users', {
      data: {
        username: 'root',
        name: 'superuser',
        password: 'secret'
      }
    })
    await page.goto('http://localhost:5173')

  })

  test('Login form is shown', async ({ page }) => {
    const textboxes = await page.getByRole('textbox').all()
    const username = textboxes[0]
    const password = textboxes[1]
    const loginButton = await page.getByRole('button', { name: 'login' })

    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('root')
      await textboxes[1].fill('secret')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('superuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('root')
      await textboxes[1].fill('wrongpassword')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong Credentials')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await login(page,'root','secret')
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('Title of the blog')
        await textboxes[1].fill('Sovan')
        await textboxes[2].fill('url.com')
        await page.getByRole('button', { name: 'create' }).click()
        // await page.getByText('Title of the blog').waitFor()

        const notification = await page.getByText('A new blog Title of the blog by Sovan added')
        await expect(notification).toBeVisible()
      })

      describe('blogs are already present', () => { 
        beforeEach(async ({ page }) => {
            await createBlog(page, 'Title of the blog', 'Sovan', 'url.com')
        //   await login(page,'root','secret')
        })
          test('a blog can be liked', async ({ page }) => {
            
            // const notification = await page.getByText('A new blog Title of the blog by Sovan added')
            // await expect(notification).toBeVisible()

            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            // after clicking like, the number of likes should be 1
            const textcontent = await page.getByTestId('likes')
            await expect(textcontent).toHaveText('1 likeslike');
            
          })
          
          test('a blog can be deleted by the user who created it', async ({ page }) => {
            
            // const notification = await page.getByText('A new blog Title of the blog by Sovan added')
            // await expect(notification).toBeVisible()
            await page.getByRole('button', { name: 'view' }).click()

             page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm');
                // expect(dialog.message()).toContain('Remove blog'); // optional: check message
                await dialog.accept();
              });

            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByTestId('title')).toHaveCount(0);
          })

          test('a blog cannot be deleted by another user', async ({ page, request }) => {
            await page.getByRole('button', { name: 'Log Out' }).click()
            await request.post('http://localhost:3000/api/users', {
              data: {
                username: 'root2',
                name: 'superuser2',
                password: 'secret'
              }
            })
            await login(page,'root2','secret')
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
          })


          test('blog ordering based on likes', async ({ page }) => {  
            
              await createBlog(page, 'Title of the blog 2', 'Rom Ji', 'url2.com');
              await createBlog(page, 'Title of the blog 3', 'Hello Ji', 'url3.com');

              // Like "Title of the blog 3" twice
              const blog3 = page.locator('.blog', { hasText: 'Title of the blog 3' });
              await blog3.getByRole('button', { name: /view/i }).click();
              const blog3LikeBtn = blog3.getByRole('button', { name: /like/i });
              const blog3Likes = blog3.locator('[data-testid="likes"]');

              await blog3LikeBtn.click();
              await expect(blog3Likes).toHaveText('1 likeslike');
              await blog3LikeBtn.click();
              await expect(blog3Likes).toHaveText('2 likeslike');

              await blog3.getByRole('button', { name: /cancel/i }).click();

              // Like "Title of the blog 2" once
              const blog2 = page.locator('.blog', { hasText: 'Title of the blog 2' });
              await blog2.getByRole('button', { name: /view/i }).click();
              const blog2LikeBtn = blog2.getByRole('button', { name: /like/i });
              const blog2Likes = blog2.locator('[data-testid="likes"]');

              await blog2LikeBtn.click();
              await expect(blog2Likes).toHaveText('1 likeslike');

              await blog2.getByRole('button', { name: /cancel/i }).click();

              // Assert the new order: blog 3 should be first
              const blogs = page.locator('.blog');
              await expect(blogs.nth(0)).toContainText('Title of the blog 3');
              await expect(blogs.nth(1)).toContainText('Title of the blog 2');
          })
          
       })
    })
  })

})