<template>
  <section v-if="role_usuario == 'administrador'" class="section_administrador">
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
                <img src="../assets/icones/perfil.png" :src="perfil.foto_usuario || '../assets/icones/perfil.png'"
                  alt="Foto de perfil">
              </div>
              <h2>{{ perfil.usuario.nome_usuario }}</h2>
              <p class="profile-role">{{ perfil.cargo_usuario }}</p>
              <p>membro desde {{ formatDate(perfil.data_admisao) }}</p>
              <button class="change-photo-btn" @click="openPhotoUpload">Alterar Foto</button>
              <input type="file" ref="photoInput" style="display: none" accept="image/*" @change="handlePhotoUpload">
            </div>

            <nav class="profile-menu">
              <a href="#" class="active">Informações Pessoais</a>
              <a href="#">Configurações</a>
              <a href="#">Segurança</a>
              <a href="#">Notificações</a>
            </nav>
          </div>

          <div class="profile-details">
            <section class="personal-info">
              <h2>Dados do Funcionário</h2>
              <p>Veja as informações relacionadas ao seu trabalho</p>

              <div class="info-grid">
                <div class="info-item">
                  <label>Quantidade de Receitas</label>
                  <div class="info-value">{{ perfil.numero_receitas_feitas }}</div>
                </div>

                <div class="info-item">
                  <label>Restaurante</label>
                  <div class="info-value">Restaurante Sabor do Chef</div>
                </div>

                <div class="info-item">
                  <label>Cargo</label>
                  <div class="info-value">{{ perfil.cargo_usuario }}</div>
                </div>

                <div class="info-item">
                  <label>Membro desde</label>
                  <div class="info-value">{{ formatDate(perfil.data_admisao) }}</div>
                </div>
              </div>
            </section>

            <section class="edit-section" v-if="editing">
              <h2>Editar Informações</h2>
              <form @submit.prevent="saveChanges">
                <div class="form-group">
                  <label for="username">Nome de Usuário</label>
                  <input type="text" id="username" v-model="editForm.nome_usuario" required>
                </div>

                <div class="form-group">
                  <label for="role">Cargo</label>
                  <input type="text" id="role" v-model="editForm.cargo_usuario" required>
                </div>

                <div class="form-actions">
                  <button type="button" @click="cancelEdit">Cancelar</button>
                  <button type="submit">Salvar Alterações</button>
                </div>
              </form>
            </section>

            <button v-else class="edit-btn" @click="startEditing">Editar Perfil</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mensagem de bloqueio do usuário -->
  <div v-else class="mensagem_acesso">
    Seu nível de acesso não é compatível com essa funcionalidade...
  </div>
</template>

<script>
import { getPerfilById, updatePerfil } from '~/assets/js/request_api_perfil';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      perfil: {
        nome_usuario: '',
        cargo_usuario: '',
        data_admisao: '',
        foto_usuario: '',
        numero_receitas_feitas: 0,
        numero_livros_publicados: 0,
        media_avaliacoes: 0
      },
      loading: true,
      error: null,
      editing: false,
      editForm: {
        nome_usuario: '',
        cargo_usuario: '',
        foto_usuario: null
      },
      role_usuario: Cookies.get("cargo_user")
    }
  },
  async mounted() {
    await this.fetchPerfil();
  },
  methods: {
    async fetchPerfil() {
      this.loading = true;
      this.error = null;
      try {
        const perfilData = await getPerfilById(Cookies.get("id_user")); // trocar pelo ID real
        this.perfil = perfilData;
      } catch (error) {
        this.error = 'Erro ao carregar perfil: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    startEditing() {
      this.editForm = {
        nome_usuario: this.perfil.nome_usuario,
        cargo_usuario: this.perfil.cargo_usuario,
        foto_usuario: null
      };
      this.editing = true;
    },
    cancelEdit() {
      this.editing = false;
    },
    async saveChanges() {
      try {
        this.loading = true;

        const updatedPerfil = await updatePerfil(this.perfil.id_funcionario, this.editForm);

        this.perfil.usuario.nome_usuario = updatedPerfil.usuario.nome_usuario;
        this.perfil.cargo_usuario = updatedPerfil.cargo_usuario;
        this.perfil.foto_usuario = updatedPerfil.foto_usuario;

        this.editing = false;
      } catch (error) {
        this.error = 'Erro ao atualizar perfil: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
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
          const updatedPerfil = await updatePerfil(this.perfil.id_funcionario, {
            ...this.editForm,
            foto_usuario: reader.result
          });

          this.perfil.foto_usuario = updatedPerfil.foto_usuario;
        } catch (error) {
          this.error = 'Erro ao atualizar foto: ' + error.message;
        } finally {
          this.loading = false;
          event.target.value = '';
        }
      };
      reader.readAsDataURL(file);
    }

  },
  head() {
    return {
      title: 'Meu Perfil'
    }
  }
}
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
  background: #4CAF50;
  color: white;
}

.edit-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>