import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import useTitleEffect from ".";
import { act } from "react-dom/test-utils";

jest.useFakeTimers()

const spy = jest.spyOn(document, 'title', 'set')
const setIntervalSpy = jest.spyOn(window, 'setInterval')

describe("useTitleEffect", () => {

  describe('using default settings', () => {
    describe('with additional messages', () => {
      const Component = () => {
        useTitleEffect("My awesome app", {
          messages: ["message 1", "message 2"]
        });

        return (<div>contents</div>)
      };

      describe('after 8 seconds', () => {
        beforeAll(() => {
          spy.mockClear()

          act(() => {
            render(<Component />)
            jest.advanceTimersByTime(8000)
          })
        });

        it('should have change the document title 10 times', () => {

          expect(spy.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "(2) My awesome app",
      ],
      Array [
        "message 1",
      ],
      Array [
        "message 2",
      ],
      Array [
        "(2) My awesome app",
      ],
      Array [
        "message 1",
      ],
      Array [
        "message 2",
      ],
      Array [
        "(2) My awesome app",
      ],
      Array [
        "message 1",
      ],
      Array [
        "message 2",
      ],
      Array [
        "(2) My awesome app",
      ],
    ]
    `)

        })
      })
    })

    describe('without additional messages', () => {
      const Component = () => {
        useTitleEffect("My awesome app");

        return (<div>contents</div>)
      };
      describe('after 8 seconds', () => {
        beforeAll(() => {
          spy.mockClear()
          setIntervalSpy.mockClear()
          act(() => {
            render(<Component />)
            jest.advanceTimersByTime(8000)
          })
        });

        it('should have change the document only once', () => {

          expect(spy.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "My awesome app",
  ],
]
`)

        })

        it('should not have created an interval', () => {
          expect(setIntervalSpy).not.toHaveBeenCalled()
        })
      })

    })
  })

  describe('using custom message format and 300ms duration', () => {
    const messages = [
      {
        message: 'Hello!',
        author: {
          name: 'John Doe'
        }
      },
      {
        message: 'Hey!',
        author: {
          name: 'Jane Doe'
        }
      },
      {
        message: 'U there?',
        author: {
          name: 'John Doe'
        }
      },
    ]

    const Component = () => {
      useTitleEffect(
        "My awesome app",
        {
          messages,
          duration: 300,
          formatter: ({ title, messages }) => {
            const uniqueAuthors = new Set(messages.map(message => message.author.name))
            return messages.length ? [
              `(${messages.length}) ${title}`,
              `(${messages.length}) You've got messages from ${Array.from(uniqueAuthors).length} contacts`
            ] : [title]
          }
        });

      return (<div>contents</div>)
    };

    describe('after 1 second', () => {
      beforeAll(() => {
        spy.mockClear();

        act(() => {
          render(<Component />)
          jest.advanceTimersByTime(1000)
        })
      });

      it('should have change the document four times', () => {

        expect(spy.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "(3) My awesome app",
  ],
  Array [
    "(3) You've got messages from 2 contacts",
  ],
  Array [
    "(3) My awesome app",
  ],
  Array [
    "(3) You've got messages from 2 contacts",
  ],
]
`)
      });
    });
  })
});
