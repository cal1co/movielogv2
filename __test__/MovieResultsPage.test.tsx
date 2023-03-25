import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import {test, vi} from 'vitest';
import MovieResultsPage from '../src/pages/MovieResultsPage';
import { MovieSearchResult } from '../src/types/MovieTypes';

vi.mock('axios');

describe('MovieResultsPage', () => {
  // const mockMovie: MovieSearchResult = {
  //   page: 1,
  //   results: [
  //     {
  //       id: 557,
  //       title: 'Spider-Man',
  //       poster_path: '/nyBtN2QqimXKZwYc7iTJlt18CfY.jpg',
  //       genre_ids: [14, 28],
  //       release_date:"2002-05-01",
  //       overview:"After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man."
  //     },
  //   ],
  //   total_pages: 1,
  //   total_results: 1,
  // };

  // beforeEach(() => {
  //   vi.clearAllMocks();
  // });

  test('should render search results', async () => {

  });

  test('should display error when there are no search results', async () => {

  });

  test('more results should be queried if not on last page', async () => {

  });

  
});  
