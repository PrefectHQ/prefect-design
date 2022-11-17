import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'

import PPager from '../PPager.vue'

describe.concurrent('PPager', () => {
  it('disables previous button when on the first page', async () => {
    const { getByText } = render(PPager, {
      props: {
        page: 1,
        pageCount: 3,
      },
    })
    const previousButton = await getByText('Previous')
    expect(previousButton.getAttribute('disabled')).toBeTruthy()
  })
  it('emits an event when the next button is pressed', async () => {
    const { getByText, emitted } = render(PPager, {
      props: {
        page: 1,
        pages: 3,
      },
    })
    const nextButton = await getByText('Next')
    await nextButton.click()
    expect(emitted()).toHaveProperty('update:page')
  })
  it('emits an event when the prev button is pressed', async () => {
    const { getByText, emitted } = render(PPager, {
      props: {
        page: 2,
        pages: 3,
      },
    })
    const prevButton = await getByText('Previous')
    await prevButton.click()
    expect(emitted()).toHaveProperty('update:page')
  })
  describe('simple pager', () => {
    it('informs the user of which page they’re viewing', async () => {
      const { container } = render(PPager, {
        props: {
          page: 1,
        },
      })
      const pageText = await container.getElementsByTagName('p')[0].textContent?.trim()
      expect(pageText).toBe('Page 1')
    })
  })
  describe('normal pager', () => {
    it('informs the user of which page they are viewing out of the total available', async () => {
      const { container } = render(PPager, {
        props: {
          page: 1,
          pages: 3,
        },
      })

      const pageText = await container.getElementsByTagName('p')[0].textContent?.trim()

      expect(pageText).toBe('Showing page 1 of 3')
    })
    it('disables the next button when viewing the last page', async () => {
      const { getByText } = render(PPager, {
        props: {
          page: 3,
          pages: 3,
        },
      })

      const nextButton = await getByText('Next')
      expect(nextButton.getAttribute('disabled')).toBeTruthy()
    })
  })
})
