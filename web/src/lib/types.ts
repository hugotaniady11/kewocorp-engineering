// ============================================================
// Database Types (mirrors Supabase schema)
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          client: string
          slug: string
          description: string | null
          image_url: string | null
          video_url: string | null
          category: string | null
          tags: string[] | null
          featured: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          icon: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      certifications: {
        Row: {
          id: string
          name: string
          number: string | null
          issuer: string | null
          order_index: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['certifications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          status: 'new' | 'read' | 'replied'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at' | 'status'>
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contact_status: 'new' | 'read' | 'replied'
    }
  }
}

// ============================================================
// Application Types
// ============================================================

export type Project = Database['public']['Tables']['projects']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Certification = Database['public']['Tables']['certifications']['Row']
export type Contact = Database['public']['Tables']['contacts']['Row']
export type ContactInsert = Database['public']['Tables']['contacts']['Insert']

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

export interface TeamMember {
  name: string
  title: string
  bio: string
  imageUrl: string
  education: string[]
  licenses: string[]
}
