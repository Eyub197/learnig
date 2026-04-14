import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe } from 'vitest';

import { Counter } from './counter';

import '@testing-library/jest-dom/vitest';
import { useActionState } from 'react';

describe('Counter ', () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it('renders with an initial count of 0', () => {
    const counter = screen.getByTestId("counter-count")
    expect(counter).toHaveTextContent('0')
  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    const decrementButton = screen.getByRole("button", { name: /decrement/i })
    const resetButton = screen.getByRole("button", { name: /reset/i })
    expect(decrementButton).toBeDisabled()
    expect(resetButton).toBeDisabled()
  });

  it('displays "days" when the count is 0', () => {
    const daysCounter = screen.getByTestId("counter-unit")
    expect(daysCounter).toHaveTextContent(/days/i)
  });

  it(
    'increments the count when the "Increment" button is clicked',
    async () => {
      const incrementButton = screen.getByRole("button", { name: /increment/i })
      const heading = screen.getByTestId("counter-count")
      await act(async () => {
        await userEvent.click(incrementButton)
      })
      expect(heading).toHaveTextContent("1")
    },
  );

  it('displays "day" when the count is 1', async () => {
    const incrementButton = screen.getByRole("button", { name: /increment/i })
    const daysCounter = screen.getByTestId("counter-unit")
    await act(async () => {
      await userEvent.click(incrementButton)
    })
    expect(daysCounter).toHaveTextContent(/day/i)
  });

  it(
    'decrements the count when the "Decrement" button is clicked',
    async () => {
      const decrementButton = screen.getByRole("button", { name: /decrement/i })
      const incrementButton = screen.getByRole("button", { name: /increment/i })
      const heading = screen.getByTestId("counter-count")
      await act(async () => {
        await userEvent.click(incrementButton)
      })
      await act(async () => {
        await userEvent.click(decrementButton)
      })
      expect(heading).toHaveTextContent("0")
    },
  );

  it('does not allow decrementing below 0', async () => {
    const decrementButton = screen.getByRole("button", { name: /decrement/i })
    const heading = screen.getByTestId("counter-count")
    await act(async () => {
      await userEvent.click(decrementButton)
    })
    expect(heading).toHaveTextContent("0")
  });

  it(
    'resets the count when the "Reset" button is clicked',
    async () => {
      const incrementButton = screen.getByRole("button", { name: /increment/i })
      const resetButton = screen.getByRole("button", { name: /reset/i })
      const heading = screen.getByTestId("counter-count")
      await act(async () => {
        await userEvent.click(incrementButton)
      })
      await act(async () => {
        await userEvent.click(resetButton)
      })
      expect(heading).toHaveTextContent("0")
    },
  );

  it(
    'disables the "Decrement" and "Reset" buttons when the count is 0',
    () => {
      const decrementButton = screen.getByRole("button", { name: /decrement/i })
      const resetButton = screen.getByRole("button", { name: /reset/i })

      expect(decrementButton).toBeDisabled()
      expect(resetButton).toBeDisabled()

    },
  );

  it('updates the document title based on the count', async () => {
    const oldTitle = document.title
    const incrementButton = screen.getByRole("button", { name: /increment/i })

    await act(async () => {
      await userEvent.click(incrementButton)
    })


    expect(document.title).toEqual(expect.stringContaining("1 day"))
  });
});
