import { useState } from 'react'

const PLANS = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '₹ 799',
    duration: '1 month',
    features: [
      'Gym access',
      '1 fitness assessment per month',
      'Shared locker',
      'Basic equipment usage',
    ],
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: '₹ 1,499',
    duration: '1 month',
    features: [
      'Gym + cardio zone',
      'Weekly fitness assessment',
      'Nutrition guidance',
      'Personal locker',
      'Group classes access',
    ],
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '₹ 2,499',
    duration: '1 month',
    features: [
      'All-access gym & facilities',
      'Personal trainer (2 sessions/week)',
      'Priority class booking',
      'Steam & sauna',
      'Diet plan included',
    ],
  },
]

export function MembershipPlans() {
  const [chosen, setChosen] = useState(null)

  function handleChoose(plan) {
    setChosen(plan.id)
    // Demo: could redirect to checkout or show modal
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Membership Plans</h1>
          <p className="pageSub">Pick a plan that fits your goals and budget.</p>
        </div>
      </div>

      <div className="planGrid">
        {PLANS.map((plan) => (
          <article
            className={`planCard ${plan.featured ? 'planCardFeatured' : ''}`}
            key={plan.id}
          >
            {plan.featured ? <div className="planCardBadge">Popular</div> : null}
            <h2 className="planCardName">{plan.name}</h2>
            <div className="planCardPrice">{plan.price}</div>
            <div className="planCardDuration">{plan.duration}</div>
            <ul className="planCardFeatures">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className="btn primary planCardBtn"
              type="button"
              onClick={() => handleChoose(plan)}
            >
              Choose Plan
            </button>
            {chosen === plan.id ? (
              <p className="planCardChosen">Selected — proceed to payment when ready.</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
