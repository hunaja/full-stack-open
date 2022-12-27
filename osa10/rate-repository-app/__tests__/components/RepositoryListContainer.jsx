import { render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const [firstItem, secondItem] = getAllByTestId('repositoryItem');

      // First item
      expect(within(firstItem).getByText('jaredpalmer/formik')).toBeDefined();
      expect(within(firstItem).getByText('Build forms in React, without the tears')).toBeDefined();
      expect(within(firstItem).getByText('TypeScript')).toBeDefined();
      expect(within(firstItem).getByText('21856')).toBeDefined();
      expect(within(firstItem).getByText('88')).toBeDefined();
      expect(within(firstItem).getByText('3')).toBeDefined();
      expect(within(firstItem).getByText('1619')).toBeDefined();

      // First item
      expect(within(secondItem).getByText('async-library/react-async')).toBeDefined();
      expect(within(secondItem).getByText('Flexible promise-based React data loader')).toBeDefined();
      expect(within(secondItem).getByText('JavaScript')).toBeDefined();
      expect(within(secondItem).getByText('1760')).toBeDefined();
      expect(within(secondItem).getByText('72')).toBeDefined();
      expect(within(secondItem).getByText('3')).toBeDefined();
      expect(within(secondItem).getByText('69')).toBeDefined();
    });
  });
});
