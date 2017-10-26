/*

   Helper functions for Redux.

   When to use: when you have simple objects that you can fetch by
   some ID and want to store by some ID.

   Exposes three functions:
   - makeReducer() -- to make a reducer for the Redux state that will contain the data and metadata
   - makeGetOrFetch() -- to make a function that can be used to get or fetch the data
   - makeDeleter() -- similarly, a function that will delete the data items, if needed.

   Actions are only for internal use, but they all have structure like:

   {
     type: 'OBJECTNAME',
     action: 'receive',
     id: 'someid',
     object: theobject,
   }

   So no separate 'ADD_OBJECTNAME' etc as that isn't necessary for anything.

   Each fetch / receive has its own random string, to check that a received object
   belongs to the latest fetch (in case of timeouts).

   Internal state has the form:

   {
     data: {},
     metadata: {}
   }

   Data is an object that contains the actual data items. Metadata contains extra
   information like isFetching, receivedTimestamp and error.

   React components that don't care about the metadata should probably depend on
   state.objectname.data in connect(), so that they only update when the contents
   of that change. Access to the data will be by getOrFetchObjectName().
 */

const INITIAL_METADATA = {
  isFetching: false,
  error: null,
  fetchTimestamp: null,
  receivedTimestamp: null
};

export function makeReducer(objectName) {
  const upperObjectName = objectName.toUpperCase();

  const reducer = (state = {data: {}, metadata: {}}, action) => {
    if (!action || action.type !== upperObjectName) {
      return state;
    }

    let data, metadata;

    switch (action.action) {
      case 'fetch':
        metadata = {...state.metadata};
        metadata[action.id] = {...INITIAL_METADATA};
        metadata[action.id].isFetching = true;
        metadata[action.id].fetchTimestamp = new Date().getTime();
        return {data: state.data, metadata: metadata};
      case 'receive':
        if (state.metadata[action.id]) {
          metadata = {...state.metadata};
          metadata[action.id] = {...INITIAL_METADATA};
          metadata[action.id].receivedTimestamp = new Date().getTime();
          data = {...state.data};
          data[action.id] = action.object;
          return {data: data, metadata: metadata};
        } else {
          // This fetch is apparently stale, item got deleted
          return state;
        }
      case 'error':
        if (state.metadata[action.id]) {
          metadata = {...state.metadata};
          metadata[action.id] = {...INITIAL_METADATA};
          metadata[action.id].receivedTimestamp = new Date().getTime();
          metadata[action.id].error = action.error;
          return {data: state.data, metadata: metadata};
        } else {
          // This fetch is apparently stale, item got deleted
          return state;
        }
      case 'delete':
        data = {...state.data};
        metadata = {...state.metadata};
        delete data[action.id];
        delete metadata[action.id];
        return {data: data, metadata: metadata};
      default:
        return state;
    }
  };

  return reducer;
}

export function makeGetOrFetch(store, objectName, fetchFunction, params = {}) {
  const FETCH_TIMEOUT_SECONDS = params.fetchTimeout || 0;
  const STORE_TIMEOUT_SECONDS = params.storeTimeout || 0;
  const RETRY_ERROR = params.retryError || true;

  const upperObjectName = objectName.toUpperCase();
  const { data, metadata } = store[objectName];

  return function getOrFetch(dispatch, id) {
    const returnValue = null;
    const doFetch = true;

    // See if we have it
    if (data[id]) {
      // Yes, return it
      returnValue = data[id];
      doFetch = false;

      // But is it old? Then still get it
      if (STORE_TIMEOUT_SECONDS && metadata[id].receivedTimestamp) {
        const timeStored = (new Date().getTime()) - metadata[id].receivedTimestamp;

        if (timeStored > metadata[id].receivedTimestamp) {
          doFetch = true;
        }
      }
    } else {
      // We don't have it.
      if (!metadata[id] || !metadata[id].isFetching) {
        // We're not yet fetching it. Get it unless there was an error we don't retry.
        if (!RETRY_ERROR && metadata[id] && metadata[id].error) {
          doFetch = false;
        } else {
          doFetch = true;
        }
      } else {
        // We *are* fetching it. Does that stop us?
        if (FETCH_TIMEOUT_SECONDS && metadata[id].fetchTimestamp) {
          const timeFetching = (new Date().getTime()) - metadata[id].fetchTimestamp;

          doFetch = timeFetching > FETCH_TIMEOUT_SECONDS;
        } else {
          // Yes.
          doFetch = false;
        }
      }
    }

    // Actually fetch and dispatch actions.
    if (doFetch) {
      dispatch({
        type: upperObjectName,
        action: 'fetch',
        id
      });

      fetchFunction(id).then((object) => dispatch({
        type: upperObjectName,
        action: 'receive',
        id,
        object
      })).error((error) => dispatch({
        type: upperObjectName,
        action: 'error',
        id,
        error
      }));
    }

    return returnValue;
  };
}

export function makeDeleter(objectName) {
  return function deleter(dispatch, id) {
    dispatch({
      type: objectName.toUpperCase(),
      action: 'delete',
      id
    });
  };
}
