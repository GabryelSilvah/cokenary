<template>
  <section v-if="role_usuario === 'administrador'" class="section_administrador">
    <MenuLateral class="menuLateral" />
    <div class="container_right">
      <div class="profile-container">
        <div class="profile-header">
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais</p>
        </div>

        <div v-if="loading" class="loading">Carregando perfil...</div>
        <div v-else-if="error" class="error">{{ error }}</div>

        <div v-else class="profile-content">
          <div class="profile-sidebar">
            <div class="profile-summary">
              <div class="profile-avatar">
                <img src="../assets/icones/perfil.png" :src="perfil.imagem_perfil || '../assets/icones/perfil.png'"
                  alt="Foto de perfil" />
              </div>
              <h2>{{ perfil.nome_usuario }}</h2>
              <p class="profile-role">{{ perfil.cargo?.nome }}</p>
              <p>Membro desde {{ formatDate(perfil.dt_adm) }}</p>
              <button v-if="!editing" class="edit-btn" @click="startEditing">
                Editar Perfil
              </button>
              <input type="file" ref="photoInput" style="display: none" accept="image/*" @change="handlePhotoUpload" />
            </div>


          </div>

          <div class="profile-details">
            <section class="personal-info">
              <h2>Dados do Funcionário</h2>
              <p>Veja as informações relacionadas ao seu trabalho</p>

              <div class="info-item">
                <label>Restaurante</label>
                <div class="info-value">{{ nomeRestaurante || 'Carregando...' }}</div>
              </div>

              <div class="info-item">
                <label>Cargo</label>
                <div class="info-value">{{ perfil.cargo?.nome }}</div>
              </div>

              <div class="info-item">
                <label>Membro desde</label>
                <div class="info-value">{{ formatDate(perfil.dt_adm) }}</div>
              </div>
            </section>

            <section class="edit-section" v-if="editing">
              <h2>Editar Informações</h2>
              <form @submit.prevent="saveChanges">
                <div class="form-group">
                  <label for="username">Nome de Usuário</label>
                  <input type="text" id="username" v-model.trim="editForm.nome_usuario" required maxlength="50" />
                </div>

                <div class="form-actions">
                  <button type="button" class="btn-cancel" @click="cancelEdit" :disabled="loading">
                    Cancelar
                  </button>
                  <button type="submit" class="btn-save" :disabled="loading">
                    <span v-if="!loading">Salvar Alterações</span>
                    <span v-else>Salvando...</span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div v-else class="mensagem_acesso">
    Seu nível de acesso não é compatível com essa funcionalidade...
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { funcionarioPorId } from '~/assets/api_funcionario/funcionario';
import { updatePerfil } from '~/assets/js/request_api_perfil.js';
import { buscarRestaurantePorId } from '~/assets/js/request_api_restaurante';

export default {
  data() {
    return {
      perfil: {},
      nomeRestaurante: '',
      loading: true,
      error: null,
      editing: false,
      editForm: {
        nome_usuario: ''
      },
      role_usuario: Cookies.get("cargo_user")
    };
  },
  async mounted() {
    await this.fetchPerfil();
  },
  methods: {
    async fetchPerfil() {
      this.loading = true;
      this.error = null;

      try {
        const id = Cookies.get("id_user");
        const data = await funcionarioPorId(id);

        if (!data) {
          throw new Error('Dados do perfil não encontrados');
        }

        this.perfil = data;

        if (data.listaRestaurante?.length) {
          const idRestaurante = data.listaRestaurante[0].idRestaurante;
          const restauranteData = await buscarRestaurantePorId(idRestaurante);

          if (!restauranteData) {
            throw new Error('Dados do restaurante não encontrados');
          }

          this.nomeRestaurante = restauranteData.nome_restaurante ||
            restauranteData.nomeRestaurante ||
            restauranteData.nome ||
            'Nome não encontrado';
        } else {
          this.nomeRestaurante = 'Nenhum restaurante associado';
        }
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        this.error = 'Erro ao carregar perfil. Tente recarregar a página.';
        this.$toast?.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    startEditing() {
      this.editForm.nome_usuario = this.perfil.nome_usuario;
      this.editing = true;
    },

    cancelEdit() {
      this.editing = false;
    },

    async saveChanges() {
      try {
        this.loading = true;

        const updateData = {
          nome_usuario: this.editForm.nome_usuario
        };

        console.log('[saveChanges] Iniciando atualização...');

        const response = await updatePerfil(this.perfil.id, updateData);
        console.log('[saveChanges] Resposta da API:', response);

        if (response && response.status === "OK") {
          const novoNome = response.data?.nome_usuario || updateData.nome_usuario;

          this.perfil.nome_usuario = novoNome;

          // Atualizar cookie com escopo global
          Cookies.set("nome_user", novoNome, { path: '/' });

          this.$toast.success('Nome atualizado com sucesso!');

          // Recarregar completamente para refletir no layout
          window.location.href = '/perfil'; // ou a rota que carrega o nome novamente

        } else {
          throw new Error(response?.message || 'Resposta inválida da API');
        }

        this.editing = false;

      } catch (error) {
        console.error('[saveChanges] Erro na atualização:', error);

        const errorMessage = error.message.includes('Network Error')
          ? 'Erro de conexão. Verifique sua internet.'
          : error.message || 'Erro ao atualizar nome';

        this.$toast.error(errorMessage + ' Tente novamente.');

      } finally {
        this.loading = false;
      }
    }

    ,

    openPhotoUpload() {
      this.$refs.photoInput.click();
    },

    async handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          this.loading = true;
          const response = await fetch(`/perfil/${this.perfil.id}/foto`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ foto_usuario: reader.result })
          });

          if (!response.ok) throw new Error('Erro ao atualizar foto');

          const result = await response.json();
          this.perfil.imagem_perfil = result.foto_usuario;
        } catch (err) {
          this.error = 'Erro ao atualizar foto: ' + err.message;
        } finally {
          this.loading = false;
        }
      };
      reader.readAsDataURL(file);
    }
  },
  head() {
    return { title: 'Meu Perfil' };
  }
};
</script>

<style scoped>
@import url("~/assets/css/perfil_adm.css");

.section_administrador {
  width: 100vw;
  display: flex;
}

.loading,
.error {
  padding: 20px;
  text-align: center;
  font-size: 18px;
}

.error {
  color: #ff3333;
}

.edit-section {
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.form-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button:first-child {
  background: #ddd;
}

.form-actions button:last-child {
  background: #0037ad;
  color: white;
}

.edit-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #0020af;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
