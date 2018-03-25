import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {LazyImageBasic, LazyImage} from '../dist/react-lazy-images.es.js';

const Container = ({children}) => (
  <div className="pa3">
    <div className="min-vh-100">
      <p className="f5 sans-serif lh-copy measure">
        Scroll down to see the photos :)<br />
        You might want to throttle to see the effect
      </p>
    </div>
    <div className="mw6">{children}</div>
  </div>
);

// Basic component to show placeholder/show actual image component
storiesOf('LazyImageBasic', module)
  .add(
    'Basic use',
    withInfo(
      'Basic component to show placeholder or the actual image once in view'
    )(() => (
      <Container>
        <LazyImageBasic
          placeholder={
            <img src="https://www.fillmurray.com/g/60/40" className="w-100" />
          }
          actual={
            <img src="https://www.fillmurray.com/g/600/400" className="w-100" />
          }
        />
      </Container>
    ))
  )
  // Always load an image (aka "eagerly"; how the browser does it already.
  // Useful if you want to load the actual content without waiting for Javascript.
  .add(
    'Eager loading (Server-Side Rendering)',
    withInfo(
      'Always load an image (i.e. eagerly; how the browser does it already). Useful if you want to load the actual content without waiting for Javascript. You should consider where you need this pattern. See the relevant section in README.md for more.'
    )(() => (
      <Container>
        <LazyImageBasic
          loadEagerly
          placeholder={
            <img src="https://www.fillmurray.com/g/60/40" className="w-100" />
          }
          actual={
            <img src="https://www.fillmurray.com/g/600/400" className="w-100" />
          }
        />
      </Container>
    ))
  )
  // This isn't even specific to this library; just demonstrating how you might
  // eagerly load content above the fold, and defer the rest
  .add(
    'Eagerly load some images',
    withInfo(
      'This is not specific to this library; just demonstrating how you might eagerly load content above the fold, and defer the rest'
    )(() => (
      <Container>
        {[
          ['first', '30/20', '300/200'],
          ['second', '60/40', '600/400'],
          ['third', '90/60', '900/600']
        ].map(([key, placeholder, actual], i) => (
          <LazyImageBasic
            loadEagerly={i === 0}
            key={key}
            placeholder={
              <img
                src={`https://www.fillmurray.com/g/${placeholder}`}
                className="w-100"
              />
            }
            actual={
              <img
                src={`https://www.fillmurray.com/g/${actual}`}
                className="w-100"
              />
            }
          />
        ))}
      </Container>
    ))
  );

// Component that preloads the image and only swaps once ready
storiesOf('LazyImage', module).add(
  'Basic use',
  withInfo('Component that preloads the image and only swaps once ready')(
    () => (
      <Container>
        <LazyImage
          src="https://www.fillmurray.com/g/600/400"
          placeholder={
            <img src="https://www.fillmurray.com/g/60/40" className="w-100" />
          }
          actual={
            <img src="https://www.fillmurray.com/g/600/400" className="w-100" />
          }
        />
        <LazyImage
          src="https://www.fillmurray.com/g/300/200"
          placeholder={
            <img src="https://www.fillmurray.com/g/30/20" className="w-100" />
          }
          actual={
            <img src="https://www.fillmurray.com/g/300/200" className="w-100" />
          }
        />
      </Container>
    )
  )
);