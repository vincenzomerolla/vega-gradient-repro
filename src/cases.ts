import type {ViewStyle} from 'react-native';

export type GradientCase = {
  id: string;
  label: string;
  /** What Chrome / CSS renders for the same style. */
  expected: string;
  /**
   * The gradient string. Deliberately not called `value`: the Reanimated
   * babel plugin rewrites `x.value` inside a `style` prop.
   */
  backgroundImage: string;
  extraStyle?: ViewStyle;
};

export type CaseGroup = {
  id: string;
  title: string;
  description: string;
  cases: GradientCase[];
};

const RED_TO_BLUE = 'linear-gradient(to right, #ef4444, #3b82f6)';

export const caseGroups: CaseGroup[] = [
  {
    id: 'a',
    title: 'Issue A: a plain View paints nothing',
    description: `All tiles use ${RED_TO_BLUE}. Only the extra style differs.`,
    cases: [
      {
        id: 'a1',
        label: 'no extra style',
        expected: 'red → blue',
        backgroundImage: RED_TO_BLUE,
      },
      {
        id: 'a2',
        label: 'borderRadius: 8',
        expected: 'red → blue, rounded',
        backgroundImage: RED_TO_BLUE,
        extraStyle: {borderRadius: 8},
      },
      {
        id: 'a3',
        label: "borderWidth: 0.01, borderColor: 'transparent'",
        expected: 'red → blue',
        backgroundImage: RED_TO_BLUE,
        extraStyle: {borderWidth: 0.01, borderColor: 'transparent'},
      },
      {
        id: 'a4',
        label: "overflow: 'hidden'",
        expected: 'red → blue',
        backgroundImage: RED_TO_BLUE,
        extraStyle: {overflow: 'hidden'},
      },
    ],
  },
  {
    id: 'b',
    title: 'Issue B: stops with an all-zero color break the gradient',
    description:
      "All tiles have overflow: 'hidden' (the Issue A workaround) and fade red into the grey backdrop.",
    cases: [
      {
        id: 'b1',
        label: 'transparent',
        expected: 'red → fades out',
        backgroundImage: 'linear-gradient(to right, #ef4444, transparent)',
      },
      {
        id: 'b2',
        label: 'rgba(0, 0, 0, 0)',
        expected: 'red → fades out',
        backgroundImage: 'linear-gradient(to right, #ef4444, rgba(0, 0, 0, 0))',
      },
      {
        id: 'b3',
        label: '#00000000',
        expected: 'red → fades out',
        backgroundImage: 'linear-gradient(to right, #ef4444, #00000000)',
      },
      {
        id: 'b4',
        label: 'rgba(0, 0, 0, 0) 50%, 3 stops',
        expected: 'red → clear at 50% → blue',
        backgroundImage:
          'linear-gradient(to right, #ef4444, rgba(0, 0, 0, 0) 50%, #3b82f6)',
      },
      {
        id: 'b5',
        label: 'rgba(239, 68, 68, 0) (control)',
        expected: 'red → fades out',
        backgroundImage:
          'linear-gradient(to right, #ef4444, rgba(239, 68, 68, 0))',
      },
      {
        id: 'b6',
        label: 'rgba(1, 1, 1, 0) (control)',
        expected: 'red → fades out (slightly darker)',
        backgroundImage: 'linear-gradient(to right, #ef4444, rgba(1, 1, 1, 0))',
      },
      {
        id: 'b7',
        label: 'rgba(1, 1, 1, 0) 50%, 3 stops (control)',
        expected: 'red → clear at 50% → blue',
        backgroundImage:
          'linear-gradient(to right, #ef4444, rgba(1, 1, 1, 0) 50%, #3b82f6)',
      },
    ],
  },
];

// Issue B tiles all get the Issue A workaround so only the color differs.
for (const c of caseGroups[1].cases) {
  c.extraStyle = {overflow: 'hidden', ...c.extraStyle};
}
