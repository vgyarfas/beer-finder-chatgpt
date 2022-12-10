import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

// Type definitions for the PunkAPI beer object
type PunkAPIBeer = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: {
    value: number;
    unit: string;
  };
  boil_volume: {
    value: number;
    unit: string;
  };
  method: {
    mash_temp: [
      {
        temp: {
          value: number;
          unit: string;
        };
        duration: number;
      }
    ];
    fermentation: {
      temp: {
        value: number;
        unit: string;
      };
    };
    twist: string;
  };
  ingredients: {
    malt: [
      {
        name: string;
        amount: {
          value: number;
          unit: string;
        };
      }
    ];
    hops: [
      {
        name: string;
        amount: {
          value: number;
          unit: string;
          //unit: string; //ChatGPT error, mindig duplikál
        };
        add: string;
        attribute: string;
      }
    ];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
};

const MainPage: React.FC = () => {
  const [beers, setBeers] = useState<PunkAPIBeer[]>([]);
  const [page, setPage] = useState(1);

  // Fetch the beer data from the PunkAPI
  useEffect(
    () => {
      async function fetchBeers() {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`);
        const data = await response.json();
        setBeers(data);
      }

      fetchBeers();
    },
    [page]
  );

  if (!beers.length) {
    return <div>Loading beers...</div>;
  }

  return (
    <div>
      <h1>Beers</h1>
      <div className="beers-grid">
        {beers.map(beer => (
          <div key={beer.id} className="beer-item">
            <Link to={`/beer/${beer.id}`}>
              <img src={beer.image_url} alt={beer.name} />
              <div className="name">{beer.name}</div>
              <div className="abv">{beer.abv}%</div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default MainPage;
