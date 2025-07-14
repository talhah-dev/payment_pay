'use client'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/app/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
