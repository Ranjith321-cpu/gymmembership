import { useMemo, useState } from 'react'
import { Calendar, Clock, Dumbbell, Flame, Heart, Timer, Zap } from 'lucide-react'
import { workoutPlan } from '../data/workoutData.js'

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

function restTimeFor(difficulty) {
  switch (difficulty) {
    case 'Beginner':
      return '60s'
    case 'Intermediate':
      return '75s'
    case 'Advanced':
      return '90s'
    default:
      return '60s'
  }
}

export function WorkoutSchedule() {
  const [activeDayId, setActiveDayId] = useState(workoutPlan[0]?.id ?? 'mon')

  const activeDay = useMemo(
    () => workoutPlan.find((d) => d.id === activeDayId) ?? workoutPlan[0],
    [activeDayId],
  )

  return (
    <div className="min-h-[calc(100vh-120px)] w-full bg-[linear-gradient(145deg,_#2b2f36,_#1f2329)] p-4 text-slate-100 sm:p-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 shadow-sm ring-1 ring-white/10 backdrop-blur">
              <Zap className="h-4 w-4 text-[#6EE7B7]" />
              Neon Fitness Plan
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Workout Schedule
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-300">
              Weekly split with a premium glassmorphism vibe. Tap a day to reveal exercises.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(110,231,183,0.18)]">
              <Timer className="h-5 w-5 text-[#34D399]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">Selected day</div>
              <div className="text-sm font-bold text-white">
                {activeDay?.day} · <span className="text-[#6EE7B7]">{activeDay?.focus}</span>
              </div>
            </div>

            <div className="ml-1 hidden items-center gap-2 sm:flex">
              <button
                type="button"
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur',
                  'transition duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg',
                  'shadow-[0_0_18px_rgba(52,211,153,0.18)]',
                )}
                aria-label="Calendar"
              >
                <Calendar className="h-4 w-4 text-[#6EE7B7]" />
              </button>
              <button
                type="button"
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur',
                  'transition duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg',
                  'shadow-[0_0_18px_rgba(52,211,153,0.18)]',
                )}
                aria-label="Heart"
              >
                <Heart className="h-4 w-4 text-[#6EE7B7]" />
              </button>
              <button
                type="button"
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur',
                  'transition duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg',
                  'shadow-[0_0_18px_rgba(52,211,153,0.18)]',
                )}
                aria-label="Workout"
              >
                <Dumbbell className="h-4 w-4 text-[#6EE7B7]" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {workoutPlan.map((day) => {
            const selected = day.id === activeDayId
            const maxExercises = Math.max(1, ...workoutPlan.map((d) => d.exercises.length))
            const progress = Math.round((day.exercises.length / maxExercises) * 100)

            return (
              <section
                key={day.id}
                className={cn(
                  'rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur sm:p-5',
                  'transition-all duration-300 hover:shadow-lg',
                  selected
                    ? 'shadow-[0_18px_55px_rgba(0,0,0,0.35),_0_0_0_1px_rgba(110,231,183,0.30),_0_0_28px_rgba(52,211,153,0.18)]'
                    : 'hover:-translate-y-0.5 hover:bg-white/10',
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveDayId(day.id)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                  aria-pressed={selected}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10',
                        'shadow-[0_0_18px_rgba(52,211,153,0.14)]',
                        selected ? 'ring-[#6EE7B7]/30' : '',
                      )}
                    >
                      <Flame className={cn('h-5 w-5', selected ? 'text-[#6EE7B7]' : 'text-slate-200')} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                          {day.day}
                        </h2>
                        <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/10">
                          {day.focus}
                        </span>
                        {selected ? (
                          <span className="inline-flex items-center rounded-full bg-[#34D399]/15 px-2.5 py-1 text-xs font-semibold text-[#6EE7B7] ring-1 ring-[#6EE7B7]/25">
                            Active
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-slate-300">{day.summary}</p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-2 w-40 overflow-hidden rounded-full bg-black/25 ring-1 ring-white/10">
                          <div
                            className={cn(
                              'h-full rounded-full bg-gradient-to-r from-[#6EE7B7] to-[#34D399]',
                              selected ? 'shadow-[0_0_18px_rgba(52,211,153,0.35)]' : '',
                            )}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="text-xs font-semibold text-slate-300">
                          <span className={cn(selected ? 'text-[#6EE7B7]' : 'text-slate-200')}>
                            {progress}%
                          </span>{' '}
                          intensity
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 ring-1 ring-white/10 sm:flex">
                    <Dumbbell className="h-4 w-4 text-[#6EE7B7]" />
                    {day.exercises.length} exercises
                  </div>
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-300',
                    selected ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {day.exercises.map((ex) => {
                        const restTime = restTimeFor(ex.difficulty)
                        return (
                          <article
                            key={ex.id}
                            className={cn(
                              'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur',
                              'transition-all duration-300',
                              'hover:scale-105 hover:bg-white/10 hover:shadow-lg',
                            )}
                          >
                            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#34D399]/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_0_18px_rgba(52,211,153,0.18)]">
                                    <Dumbbell className="h-4 w-4 text-[#6EE7B7]" />
                                  </span>
                                  <h3 className="truncate text-sm font-extrabold text-white sm:text-base">
                                    {ex.name}
                                  </h3>
                                </div>
                              </div>

                              <div className="inline-flex items-center gap-1 rounded-2xl bg-white/5 px-2 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/10">
                                <Clock className="h-4 w-4 text-[#6EE7B7]" />
                                {restTime}
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <div className="rounded-2xl bg-black/20 px-3 py-2 ring-1 ring-white/10">
                                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                  Sets
                                </div>
                                <div className="mt-0.5 inline-flex items-center gap-2">
                                  <span className="rounded-full bg-[#34D399]/15 px-2 py-0.5 text-xs font-extrabold text-[#6EE7B7] ring-1 ring-[#6EE7B7]/25 shadow-[0_0_16px_rgba(52,211,153,0.20)]">
                                    {ex.sets}
                                  </span>
                                  <span className="text-xs text-slate-300">work sets</span>
                                </div>
                              </div>

                              <div className="rounded-2xl bg-black/20 px-3 py-2 ring-1 ring-white/10">
                                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                  Reps
                                </div>
                                <div className="mt-0.5 inline-flex items-center gap-2">
                                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-extrabold text-white ring-1 ring-white/10">
                                    {ex.reps}
                                  </span>
                                  <span className="text-xs text-slate-300">each</span>
                                </div>
                              </div>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
