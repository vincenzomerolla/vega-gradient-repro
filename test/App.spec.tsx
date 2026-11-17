import 'react-native';
import {render} from '@testing-library/react-native';
import * as React from 'react';

import {App} from '../src/App';
import {caseGroups} from '../src/cases';

describe('App', () => {
  it('renders a tile for every case', () => {
    const screen = render(<App />);
    for (const group of caseGroups) {
      for (const c of group.cases) {
        expect(screen.getByTestId(`case-${c.id}`)).toBeTruthy();
      }
    }
  });

  it('applies the Issue A workaround to every Issue B case', () => {
    const issueB = caseGroups.find((g) => g.id === 'b');
    for (const c of issueB?.cases ?? []) {
      expect(c.extraStyle?.overflow).toBe('hidden');
    }
  });
});
