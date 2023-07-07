import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { CoffeeService } from '../services/coffee-service';
import { appConfig } from '../configs/app';

export function useInitialCoffeeFeed() {
  return useQuery(['coffees'], CoffeeService.initialCoffeeFeed);
}

export function useAddCoffee() {
  return useMutation(CoffeeService.addCoffee);
}

export function useGetCoffeeFeed() {
  const getFeed = ({ pageParam = 0 }) => {
    return CoffeeService.getCoffeeFeed(pageParam);
  };

  return useInfiniteQuery(['coffees'], getFeed, {
    getNextPageParam: (lastPage, allPages) => {
      const count = allPages.reduce(
        (accumulator, page) => accumulator + page.length,
        0
      );

      const isNextPage = lastPage.length === appConfig.apiLimit;

      return isNextPage ? count : undefined;
    },
    staleTime: Infinity,
  });
}
