import React, { useEffect, useRef } from 'react';
import Card from './card';
import {
  useAddCoffee,
  useGetCoffeeFeed,
} from '../hooks/coffee-api';

import SkeletonCard from './skeleton-card';
import { useInterval } from 'usehooks-ts';
import { appConfig } from '../configs/app';
import ActionButton from './action-button';

const CoffeeFeed: React.FC = () => {
  const { mutate: addCoffee, isLoading: isAddCoffeeLoading } = useAddCoffee();
  const {
    data: coffees,
    fetchNextPage,
    hasNextPage,
    isFetching: isNextPageFetching,
  } = useGetCoffeeFeed();
  const userActiveRef = useRef(true);

  useInterval(
    () => {
      if (!userActiveRef.current) {
        addCoffee(undefined, {
          onSuccess: (coffee) => {
            if (!coffees) return;
            if (!hasNextPage) {
              return fetchNextPage({
                pageParam: coffees.pages.reduce(
                  (accumulator, page) => accumulator + page.length,
                  0
                ),
              });
            }
          },
        });
      }
    },
    30000
  );

  useEffect(() => {
    const handleUserActivity = () => {
      userActiveRef.current = true;
    };

    const handleUserInactivity = () => {
      userActiveRef.current = false;
    };

    document.addEventListener('mouseenter', handleUserActivity);
    document.addEventListener('mouseleave', handleUserInactivity);

    return () => {
      document.removeEventListener('mouseenter', handleUserActivity);
      document.removeEventListener('mouseleave', handleUserInactivity);
    };
  }, []);

  const handleAddNewCoffee = () => {
    addCoffee(undefined, {
      onSuccess: (coffee) => {
        if (!coffees) return;
        return fetchNextPage({
          pageParam: coffees.pages.reduce(
            (accumulator, page) => accumulator + page.length,
            0
          ),
        });
      },
    });
  };

  const handleLoadMore = () => fetchNextPage();

  if (!coffees) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="container">
      {coffees.pages.map((page) =>
        page.map((coffee) => <Card key={coffee.id} {...coffee} />)
      )}
      {isNextPageFetching && hasNextPage && (
        [...Array(appConfig.apiLimit)].map((value, i) => <SkeletonCard key={i}/>)
      )}
      {(isAddCoffeeLoading && userActiveRef.current)  && <SkeletonCard />}
      {hasNextPage ? (
        <ActionButton isDisabled={isNextPageFetching} onClick={handleLoadMore} text={'Load More'} />
      ) : (
        <ActionButton isDisabled={isAddCoffeeLoading} onClick={handleAddNewCoffee} text={'Add New Coffee'} />
      )}
    </div>
  );
};

export default CoffeeFeed;
