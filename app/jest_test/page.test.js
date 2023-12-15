import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import Home from './page'

it('App Router: Works with Server Components', () => {
  render(<Home />)
  expect(screen.getByRole('heading')).toHaveTextContent('这一页是用来展示 jest 测试的，请查看app/jest_test文件夹')
})