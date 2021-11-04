const formFilters = document.querySelector('.map__filters');
const filterType = formFilters.querySelector('#housing-type');
const filterPrice = formFilters.querySelector('#housing-price');
const filterRooms = formFilters.querySelector('#housing-rooms');
const filterGuests = formFilters.querySelector('#housing-guests');
const filterFeatures = formFilters.querySelector('#housing-features');
const features = filterFeatures.querySelectorAll('input[type="checkbox"]');

const selectedParams = {
  selectedType: 'any',
  selectedPrice: 'any',
  selectedRooms: 'any',
  selectedGuests: 'any',
  selectedFeatures: [],
};

const setFilterTypeChange = (cb) => {
  filterType.addEventListener('change', () => {
    selectedParams.selectedType = filterType.value;
    cb();
  });
};

const setFilterPriceChange = (cb) => {
  filterPrice.addEventListener('change', () => {
    selectedParams.selectedPrice = filterPrice.value;
    cb();
  });
};

const setFilterRoomsChange = (cb) => {
  filterRooms.addEventListener('change', () => {
    selectedParams.selectedRooms = filterRooms.value;
    cb();
  });
};

const setFilterGuestsChange = (cb) => {
  filterGuests.addEventListener('change', () => {
    selectedParams.selectedGuests = filterGuests.value;
    cb();
  });
};

const setFilterFeaturesChange = (cb) => {
  filterFeatures.addEventListener('change', () => {
    const selected = [];
    features.forEach( (featureItem) => {
      if (featureItem.checked) {
        selected.push(featureItem.value);
      }
    });
    selectedParams.selectedFeatures = selected;
    cb();
  });
};

const applyFilters = (offers) => {
  let filteredOffers = offers.slice();

  if (selectedParams.selectedType !== 'any') {
    filteredOffers = filteredOffers.filter( (item) => item.offer.type === selectedParams.selectedType);
  }

  if (selectedParams.selectedPrice !== 'any') {
    filteredOffers = filteredOffers.filter( (item) => {
      switch (selectedParams.selectedPrice) {
        case 'low':
          return item.offer.price < 10000;
        case 'middle':
          return (item.offer.price >= 10000 && item.offer.price < 50000);
        case 'high':
          return item.offer.price >= 50000;
      }
    });
  }

  if (selectedParams.selectedRooms !== 'any') {
    filteredOffers = filteredOffers.filter( (item) => item.offer.rooms === +selectedParams.selectedRooms);
  }

  if (selectedParams.selectedGuests !== 'any') {
    filteredOffers = filteredOffers.filter( (item) => item.offer.guests === +selectedParams.selectedGuests);
  }

  if (selectedParams.selectedFeatures.length) {
    filteredOffers = filteredOffers.filter( (item) => {

      if (item.offer.features) {
        const offerFeatures = item.offer.features;
        const selected = selectedParams.selectedFeatures;

        return selected.every((feature) => offerFeatures.includes(feature));
      }
      return false;
    });
  }

  return filteredOffers;
};

export {
  applyFilters,
  setFilterTypeChange,
  setFilterPriceChange,
  setFilterRoomsChange,
  setFilterGuestsChange,
  setFilterFeaturesChange
};
