import { FC, useMemo, useState } from 'react';

import Input from 'src/components/atoms/Input';
import Radio from 'src/components/atoms/Radio';
import Select from 'src/components/atoms/Select';
import Section from 'src/components/molecules/Section';
import useReginalRailsFares from 'src/hooks/useReginalRailsFares';
import { formatCurrency } from 'src/libs/strings';
import { IReginalRailsFaresForm } from 'src/types/IReginalRailsFaresForm';

const Main: FC = () => {
  const { loading, data, error } = useReginalRailsFares();
  const [form, setForm] = useState<IReginalRailsFaresForm>({});

  const handleChangeForm = (attr: string) => (value?: string | number) => {
    const newForm = { ...form };
    newForm[attr as keyof IReginalRailsFaresForm] = value;
    setForm(newForm);
  };

  const fareCost = useMemo(() => {
    if (
      !form.fareZone ||
      !form.fareType ||
      !form.farePurchase ||
      !form.fareTrips ||
      !data ||
      !data.faresMapping
    ) {
      return;
    }

    // Get default price per trip
    const defaultPrices =
      data.faresMapping[form.fareZone]?.[form.fareType]?.[form.farePurchase] ||
      [];
    // Get anytime price per trip
    const specialPrices =
      data.faresMapping[form.fareZone]?.['anytime']?.[form.farePurchase] || [];

    const prices =
      defaultPrices
        .concat(specialPrices)
        .sort(
          (
            a: { trips: number; price: number },
            b: { trips: number; price: number },
          ) => {
            // Sort by trips first
            if (a.trips !== b.trips) {
              return b.trips - a.trips;
            }

            // Sort by price if trips are same
            return a.price - b.price;
          },
        ) || [];

    if (prices.length === 0) {
      return;
    }

    let total = 0;
    let trips = Number(form.fareTrips);

    // Calculate the cost with the best match
    for (let item of prices) {
      if (trips === 0) {
        break;
      }

      const quantity = Math.floor(trips / item.trips);
      trips = trips % item.trips;
      total += quantity * item.price;
    }

    return total;
  }, [data, form.farePurchase, form.fareTrips, form.fareType, form.fareZone]);

  if (loading) {
    return <div className='placeholder'>Loading...</div>;
  }

  if (!data || error) {
    return <div className='placeholder'>No Fares Data!</div>;
  }

  return (
    <>
      <Section title='Where are you going?'>
        <Select
          options={data.fareZones}
          value={form.fareZone}
          onChange={handleChangeForm('fareZone')}
        />
      </Section>
      <Section title='When are you riding?'>
        <Select
          options={data.fareTypes}
          value={form.fareType}
          onChange={handleChangeForm('fareType')}
          helperText={
            form.fareType
              ? data.fareTypes.find((item) => item.value === form.fareType)
                  ?.description
              : ''
          }
        />
      </Section>
      <Section title='Where will you purchase the fare?'>
        <Radio
          name='purchase'
          options={data.farePurchases}
          value={form.farePurchase}
          onChange={handleChangeForm('farePurchase')}
        />
      </Section>
      <Section title='How many rides will you need?'>
        <Input
          type='number'
          value={form.fareTrips}
          onChange={handleChangeForm('fareTrips')}
          label='Fare Trips'
        />
      </Section>
      <Section title='Your fares will cost' dark>
        <p className='septa-widget-result'>
          {fareCost ? formatCurrency(fareCost) : '-'}
        </p>
      </Section>
    </>
  );
};

export default Main;
