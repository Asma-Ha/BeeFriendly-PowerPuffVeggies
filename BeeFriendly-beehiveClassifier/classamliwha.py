import pandas as pd
import numpy as np
import skimage
import skimage.io
import skimage.transform
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn import metrics
from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten, MaxPool2D
from keras.preprocessing.image import ImageDataGenerator
from keras.callbacks import ModelCheckpoint, EarlyStopping
import tensorflow
from keras.models import load_model

# Set random seed to make results reproducable
np.random.seed(42)
tensorflow.random.set_seed(42)

# Global variables
img_folder='./bee_imgs/'
img_width=100
img_height=100
img_channels=3

class BeeHealthClassifier():
    def __init__(self):
        self.bees = pd.read_csv('./bee_data.csv', 
                index_col=False,  
                parse_dates={'datetime':[1,2]},
                dtype={'health':'category'})
        self.bees = self.bees.drop(['datetime','location','zip code','subspecies','pollen_carrying','caste'], axis=1) 
        self.bees.dropna(inplace=True)
    
    def _get_bees(self):
        return self.bees

    def read_img(self,file):
        img = skimage.io.imread(f"{img_folder}{file}")
        img = skimage.transform.resize(img, (img_width, img_height), mode='reflect')
        return img[:,:,:img_channels]

    def show_health_distribution(self):
        f, ax = plt.subplots(figsize=(8,6))
        self.bees.health.value_counts().plot(kind='bar', ax=ax)
        ax.set_title('Health Distribution')
        ax.set_xlabel('Health')
        ax.set_ylabel('Count')
        plt.show()

    def split_balance(self):
        # Split to train and test before balancing
        train_bees, test_bees = train_test_split(self.bees, random_state=24)

        # Split train to train and validation datasets
        train_bees, val_bees = train_test_split(train_bees, test_size=0.1, random_state=24)

        ncat_bal = int(len(train_bees)/train_bees['health'].cat.categories.size)
        train_bees_bal = train_bees.groupby('health', as_index=False).apply(lambda g:  g.sample(ncat_bal, replace=True)).reset_index(drop=True)
        return(train_bees_bal, val_bees, test_bees)

    def plot_balanced(self,train_bees, train_bees_bal):
        # Plot before and after balancing
        _, axs = plt.subplots(1,2, figsize=(8,4))

        # Before
        ax = train_bees['health'].value_counts().plot(kind='bar', ax=axs[0])
        ax.set_title('%s before balancing' % 'health')
        ax.set_ylabel('Count')

        # After
        ax = train_bees_bal['health'].value_counts().plot(kind='bar', ax=axs[1])
        ax.set_title('%s after balancing' % 'health')
        ax.set_ylabel('Count')

        plt.tight_layout()
        plt.show()

    def prepare2train(self,train_bees, val_bees, test_bees):
        # Train data
        train_X = np.stack(train_bees['file'].apply(self.read_img))
        #train_y = to_categorical(train_bees['health'].values)
        train_y  = pd.get_dummies(train_bees['health'], drop_first=False)

        # Validation during training data to calc val_loss metric
        val_X = np.stack(val_bees['file'].apply(self.read_img))
        #val_y = to_categorical(val_bees['health'].values)
        val_y = pd.get_dummies(val_bees['health'], drop_first=False)

        # Test data
        test_X = np.stack(test_bees['file'].apply(self.read_img))
        #test_y = to_categorical(test_bees['health'].values)
        test_y = pd.get_dummies(test_bees['health'], drop_first=False)

        # Data augmentation 
        generator = ImageDataGenerator(
                featurewise_center=False,  # set input mean to 0 over the dataset
                samplewise_center=False,  # set each sample mean to 0
                featurewise_std_normalization=False,  # divide inputs by std of the dataset
                samplewise_std_normalization=False,  # divide each input by its std
                zca_whitening=False,  # apply ZCA whitening
                rotation_range=180,  # randomly rotate images in the range (degrees, 0 to 180)
                zoom_range = 0.1, # Randomly zoom image 
                width_shift_range=0.2,  # randomly shift images horizontally (fraction of total width)
                height_shift_range=0.2,  # randomly shift images vertically (fraction of total height)
                horizontal_flip=True,  # randomly flip images
                vertical_flip=True)
        generator.fit(train_X)
        return (generator, train_X, val_X, test_X, train_y, val_y, test_y)

    def build_train_model(self,train_X,train_y,val_X,val_y,generator):
        # We'll stop training if no improvement after some epochs
        earlystopper2 = EarlyStopping(monitor='val_accuracy', patience=10, verbose=1)

        # Save the best model during the traning
        checkpointer = ModelCheckpoint('./best_model2.h5'
                                        ,monitor='val_accuracy'
                                        ,verbose=1
                                        ,save_best_only=True
                                        ,save_weights_only=True)
        # Build CNN model
        model=Sequential()
        model.add(Conv2D(5, kernel_size=3, input_shape=(img_width, img_height,3), activation='relu', padding='same'))
        model.add(MaxPool2D(2))
        model.add(Conv2D(10, kernel_size=3, activation='relu', padding='same'))
        model.add(Flatten())
        model.add(Dense(train_y.columns.size, activation='softmax'))
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

        # Train
        training = model.fit(generator.flow(train_X,train_y, batch_size=60)
                                ,epochs=20
                                ,validation_data=[val_X, val_y]
                                ,steps_per_epoch=50
                                ,callbacks=[earlystopper2, checkpointer])

        model.load_weights('./best_model2.h5')
        return training, model

    def eval_model(self,training, model, test_X, test_y):

        ## Trained model analysis and evaluation
        f, ax = plt.subplots(2,1, figsize=(5,5))
        ax[0].plot(training.history['loss'], label="Loss")
        ax[0].plot(training.history['val_loss'], label="Validation loss")
        ax[0].set_title('%s: loss' % 'health')
        ax[0].set_xlabel('Epoch')
        ax[0].set_ylabel('Loss')
        ax[0].legend()
        
        # Accuracy
        ax[1].plot(training.history['accuracy'], label="Accuracy")
        ax[1].plot(training.history['val_accuracy'], label="Validation accuracy")
        ax[1].set_title('%s: accuracy' % 'health')
        ax[1].set_xlabel('Epoch')
        ax[1].set_ylabel('Accuracy')
        ax[1].legend()
        plt.tight_layout()
        plt.show()

        # Accuracy by health status
        test_pred = model.predict(test_X)
        
        acc_by_subspecies = np.logical_and((test_pred > 0.5), test_y).sum()/test_y.sum()
        acc_by_subspecies.plot(kind='bar', title='Accuracy by %s' % 'health')
        plt.ylabel('Accuracy')
        plt.show()

        # Print metrics
        print("Classification report")
        test_pred = np.argmax(test_pred, axis=1)
        test_truth = np.argmax(test_y.values, axis=1)
        print(metrics.classification_report(test_truth, test_pred, target_names=test_y.columns))

        # Loss function and accuracy
        test_res = model.evaluate(test_X, test_y.values, verbose=0)
        print('Loss function: %s, accuracy:' % test_res[0], test_res[1])

    def classify_image(self,path,model):
        model.load_weights('./best_model2.h5')
        image = self.read_img(path)
        pred = model.predict(np.expand_dims(image, axis=0))
        #predicted_class = np.argmax(pred[0])
        health_labels = ['hive being robbed', 'healthy', 'few varrao, hive beetles', 'ant problems', 'missing queen', 'Varroa, Small Hive Beetles']
        decoded_labels = np.argmax(pred, axis=1)
        predicted_label = health_labels[decoded_labels[0]]
        return predicted_label

if __name__ == '__main__':
    beecl = BeeHealthClassifier()
    model = load_model('./my_model.h5')
    state = beecl.classify_image('017_079.png',model)
    print(state)
