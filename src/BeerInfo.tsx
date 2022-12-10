import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BeerInfo.css";

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
          //unit: string; //ChatGPT hiba, duplikált
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

const BeerInfo: React.FC = () => {
  const [beer, setBeer] = useState<PunkAPIBeer | null>(null);
  const { id } = useParams();
  const history = useNavigate();

  // Fetch the beer data from the PunkAPI
  useEffect(
    () => {
      async function fetchBeer() {
        const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
        const data = await response.json();
        setBeer(data[0]);
      }

      fetchBeer();
    },
    [id]
  );

  useEffect(() => console.log({ beer }), [beer]);

  if (!beer) {
    return <div>Loading beer...</div>;
  }

  return (
    <div>
      <button type="button" onClick={() => history(-1)}>
        Back
      </button>
      <div className="BeerInfo">
        <div className="BeerInfo-image">
          <img src={beer.image_url} alt={beer.name} />
        </div>
        <div className="BeerInfo-data">
          <h1 className="BeerInfo-name">{beer.name}</h1>
          <p className="BeerInfo-description">{beer.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BeerInfo;
